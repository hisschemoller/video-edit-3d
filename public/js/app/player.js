import { setup as setupWorld, animate as animateWorld } from './world.js';
import { setup as setupCanvas, draw as drawCanvas } from './canvas.js';

let frame = 0;
let framesPerDraw = 0;
let frameCounter = 0;

export function setup(url, isCapture = false) {
  fetch(url)
    .then(response => response.json())
    .then(response => {
      const { fps = 30, } = response;
      framesPerDraw = 60 / fps;
      setupWorld(response);
      setupCanvas(response);
      requestAnimationFrame(isCapture ? capture : run);
    });
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
