import { 
  setup as setupWorld,
  animate as animateWorld,
  destroyScene as destroyWorldScene,
  loadScene as loadWorldScene } from './world.js';
import { draw as drawCanvas } from './canvas.js';
import { convertToMilliseconds, sortScoreByLifespanStart, } from './util.js';

const scenes = [];

let frame = 0;
let framesPerDraw = 0;
let frameCounter = -1;
let origin = 0;
let position = 0;
let nextSceneTime = 0;
let nextSceneIndex = 0;
let data;
let infoTimeEl;


export function setup(config) {
  const { data: dataSource } = config;
  if (typeof dataSource === 'string') {
    fetch(dataSource)
    .then(response => response.json())
    .then(response => {
      setupWithData(response, config);
    });
  } else {
    setupWithData(dataSource, config);
  }

  infoTimeEl = document.querySelector('.info__time');
}

function setupWithData(dataSource, config) {
  const { isCapture, startScene = 0, } = config;
  data = dataSource;
  data.score = sortScoreByLifespanStart(data.score);
  data.score = convertToMilliseconds(data.score);
  console.log(data);

  const { fps = 30, } = data.settings;
  framesPerDraw = 60 / fps;

  origin = performance.now();
  position = 0;

  // skip to scene by index
  skipToScene(startScene);

  setupWorld(data);

  checkForNextScene(position);
  requestAnimationFrame(isCapture ? capture : run);
}

function skipToScene(sceneIndex) {
  if (data.score.length) {
    data.score.splice(0, sceneIndex);
    position = data.score[0].lifespan[0];
    origin = performance.now() - position;
    data.camera.position[2] = data.camera.position[2] + ((position / 1000) * data.settings.fps * data.camera.speed);
  }
}

function run() {
  frameCounter++;
  if (frameCounter % framesPerDraw !== 0) {
    requestAnimationFrame(run);
    return;
  }
  requestAnimationFrame(run);
  
  position = performance.now() - origin;
  checkForNextScene(position);
  drawCanvas(frame);
  animateWorld();
  infoTimeEl.textContent = (position / 1000).toFixed(1);  
  frame += 1;
}

function capture() {

}

/**
 * Check for score scenes to start or end.
 * @param {Number} position Time position within the main time.line
 */
function checkForNextScene(position) {

  // check for scenes to start
  if (position >= nextSceneTime) {
    const { canvases, score, } = data;
    for (let i = nextSceneIndex, n = data.score.length; i < n; i++) {
      const sceneData = score[i];
      const { clipId, lifespan, } = sceneData;
      if (lifespan[0] <= position) {
        nextSceneIndex++;
        nextSceneTime = nextSceneIndex < data.score.length ? data.score[nextSceneIndex].lifespan[0] : Number.MAX_VALUE;

        // store the scene end time
        scenes.push({
          clipId,
          lifespan,
        });
        scenes.sort((a, b) => a.lifespan[1] - b.lifespan[1]);

        // create the scene's objects
        loadWorldScene(data, i);
      } else {

        // nothing
        break;
      }
    }
  }

  // check for scenes to end
  if (scenes.length && position >= scenes[0].lifespan[1]) {
    while (scenes.length && position >= scenes[0].lifespan[1]) {
      const scene = data.score.find(scene => scene.clipId === scenes[0].clipId);
      scenes.splice(0, 1);

      // remove the scene
      destroyWorldScene(data, scene.clipId);
    }
  }
}
