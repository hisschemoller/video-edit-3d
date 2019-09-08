import { setup as setupWorld, animate as animateWorld } from './world.js';
import { setup as setupCanvas, draw as drawCanvas } from './canvas.js';
import { convertToMilliseconds, sortScoreByLifespanStart, } from './util.js';

const clipEndTimes = [];

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

  // check for clips to start
  if (position >= nextClipTime) {
    for (let i = nextClipIndex, n = data.score.length; i < n; i++) {
      const { clipId, lifespan, } = data.score[i];
      if (lifespan[0] <= position) {
        console.log('start clip ', i, data.score[i].lifespan[0], data.score[i].objectId );
        nextClipIndex++;
        nextClipTime = nextClipIndex < data.score.length ? data.score[nextClipIndex].lifespan[0] : Number.MAX_VALUE;

        // store the clip end time
        clipEndTimes.push({ clipId, time: lifespan[1] });
        clipEndTimes.sort((a, b) => a.time - b.time);
      } else {
        break;
      }
    }
  }

  // check for clips to end
  if (clipEndTimes.length && position >= clipEndTimes[0].time) {
    while (clipEndTimes.length && position >= clipEndTimes[0].time) {
      const clip = data.score.find(clip => clip.clipId === clipEndTimes[0].clipId);
      console.log('end clip ', clip.objectId );
      clipEndTimes.splice(0, 1);
    }
  }
}
