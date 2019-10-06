import { 
  setup as setupWorld,
  animate as animateWorld,
  destroyScene as destroyWorldScene,
  loadScene as loadWorldScene } from './world.js';
import { draw as drawCanvas } from './canvas.js';
import { convertToMilliseconds, sortScoreByLifespanStart, } from './util.js';

const clips = [];

let frame = 0;
let framesPerDraw = 0;
let frameCounter = 0;
let origin = 0;
let position = 0;
let nextClipTime = 0;
let nextClipIndex = 0;
let data;
let infoTimeEl;


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

  infoTimeEl = document.querySelector('.info__time');
}

function setupWithData(dataSource, isCapture) {
  data = dataSource;
  data.score = sortScoreByLifespanStart(data.score);
  data.score = convertToMilliseconds(data.score);
  console.log(data);

  const { fps = 30, } = data.settings;
  framesPerDraw = 60 / fps;

  origin = performance.now();
  position = 0;

  // skip to scene by index
  skipToScene(1);

  setupWorld(data);

  checkForNextClips(position);
  requestAnimationFrame(isCapture ? capture : run);
}

function skipToScene(sceneIndex) {
  data.score.splice(0, sceneIndex);
  position = data.score[0].lifespan[0];
  data.camera.position[2] = data.camera.position[2] + ((position / 1000) * data.settings.fps * data.camera.speed);
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
  drawCanvas(frame);
  animateWorld();
  infoTimeEl.textContent = (position / 1000).toFixed(1);  
  frame += 1;
}

function capture() {

}

/**
 * Check for score clips to start or end.
 * @param {Number} position Time position within the main time.line
 */
function checkForNextClips(position) {

  // check for clips to start
  if (position >= nextClipTime) {
    for (let i = nextClipIndex, n = data.score.length; i < n; i++) {
      const { canvases, score, } = data;
      const sceneData = score[i];
      const { clipId, lifespan, } = sceneData;
      if (lifespan[0] <= position) {
        nextClipIndex++;
        nextClipTime = nextClipIndex < data.score.length ? data.score[nextClipIndex].lifespan[0] : Number.MAX_VALUE;

        // store the clip end time
        clips.push({
          clipId,
          lifespan,
        });
        clips.sort((a, b) => a.lifespan[1] - b.lifespan[1]);

        // create the clip's 3D object
        // const objectData = data.objects[objectId];
        // createWorldObject(objectId, objectData);

        // create the clip's objects
        loadWorldScene(data, i);
      } else {

        // nothing
        break;
      }
    }
  }

  // check for scenes to end
  if (clips.length && position >= clips[0].lifespan[1]) {
    while (clips.length && position >= clips[0].lifespan[1]) {
      const scene = data.score.find(scene => scene.clipId === clips[0].clipId);
      clips.splice(0, 1);

      // remove the scene
      destroyWorldScene(data, scene.clipId);
    }
  }
}
