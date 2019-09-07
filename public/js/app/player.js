import { setup as setupWorld, animate as animateWorld } from './world.js';
import { setup as setupCanvas, draw as drawCanvas } from './canvas.js';

let frame = 0;
let framesPerDraw = 0;
let frameCounter = 0;

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

function setupWithData(data, isCapture) {
  console.log(data);
  const { fps = 30, } = data;
  framesPerDraw = 60 / fps;
  setupWorld(data);
  setupCanvas(data);
  requestAnimationFrame(isCapture ? capture : run);
}

function run() {
  frameCounter++;
  if (frameCounter % framesPerDraw !== 0) {
    requestAnimationFrame(run);
    return;
  }

  requestAnimationFrame(run);
  
  drawCanvas(frame);
  animateWorld();
  frame += 1;
}

function capture() {

}
