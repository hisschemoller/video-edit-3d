import { setup as setupWorld, animate as animateWorld } from './world.js';
import { setup as setupCanvas, draw as drawCanvas } from './canvas.js';
import { convertToMilliseconds, sortScoreByLifespanStart, } from './util.js';

let frame = 0;
let framesPerDraw = 0;
let frameCounter = 0;
let origin = 0;
let position = 0;
let nextClipTime = 0;
let nextClipIndex = 0;
let data;


export function setup(dataSource, isCapture = false) {
  if (typeof dataSource === 'string') {
    fetch(dataSource)
    .then(response => response.json())
    .then(response => {
      setupWithData(response, isCapture);
    });
  } else {
    setupWithData(dataSource, isCapture);
  }
}

function setupWithData(dataSource, isCapture) {
  data = dataSource;
  data.score = sortScoreByLifespanStart(data.score);
  data.score = convertToMilliseconds(data.score);
  console.log(data);
  const { fps = 30, } = data;
  framesPerDraw = 60 / fps;

  origin = performance.now();
  position = 0;

  setupWorld(data);
  // setupCanvas(data);
  checkForNextClips(position);
  requestAnimationFrame(isCapture ? capture : run);
}

function run() {
  frameCounter++;
  if (frameCounter % framesPerDraw !== 0) {
    requestAnimationFrame(run);
    return;
  }
  requestAnimationFrame(run);
  
  position = performance.now() - origin;
  checkForNextClips(position);
  // console.log(position);
  // drawCanvas(frame);
  animateWorld();
  frame += 1;
}

function capture() {

}

function checkForNextClips(position) {
  if (position >= nextClipTime) {
    for (let i = nextClipIndex, n = data.score.length; i < n; i++) {
      const { lifespan, } = data.score[i];
      if (lifespan[0] <= position) {
        console.log('start clip ', i, data.score[i].lifespan[0], data.score[i].objectId );
        nextClipIndex++;
        nextClipTime = nextClipIndex < data.score.length ? data.score[nextClipIndex].lifespan[0] : Number.MAX_VALUE;
      } else {
        break;
      }
    }
  }
}
