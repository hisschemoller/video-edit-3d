import { 
  setup as setupWorld,
  animate as animateWorld,
  destroyScene as destroyWorldScene,
  loadScene as loadWorldScene,
  getCanvas,
} from './world.js';
import { draw as drawCanvas, videoCanvasesLoadImage, } from './canvas.js';
import { convertToMilliseconds, sortScoreByLifespanStart, } from './util.js';
import { setInfo } from './controls.js';

const SKIP_FRAME_BATCH_SIZE = 30;
const scenes = [];

let isCaptureState = false;
let frameFirst;
let frameLast;
let captureThrottle;
let captureCounter = 0;
let data;
let deltaTime;
let frame = 0;
let framesPerDraw = 0;
let frameCounter = -1;
let nextSceneIndex = 0;
let nextSceneTime = 0;
let origin = 0;
let position = 0;
let socket;
let startButton;

export let isFastforwarding = false;

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
}

async function setupWithData(dataSource, config) {
  const {
    isCapture,
    startSceneIndex = 0,
    startSceneName = undefined,
    scenesToNotSkip = [],
  } = config;

  isCaptureState = isCapture;

  data = dataSource;
  data.score = sortScoreByLifespanStart(data.score);
  data.score = convertToMilliseconds(data.score);
  console.log('SCENES: Name, Start, End (in sec)');
  console.table(data.score.reduce((accumulator, scene) => {
    return [...accumulator, [
      scene.object.name,
      Math.round(scene.lifespan[0] / 1000),
      Math.round(scene.lifespan[1] / 1000)
    ]];
  }, []));
  console.log('DATA: ', data);

  const { fps = 30, } = data.settings;
  framesPerDraw = 60 / fps;

  origin = performance.now();
  position = 0;
  deltaTime = 1 / fps;

  if (isCaptureState) {
    socket = io.connect('http://localhost:3012');
    captureThrottle = config.captureThrottle || 1;
  }

  // skip to scene by index or name
  if (startSceneIndex > 0) {
    skipToSceneByIndex(startSceneIndex, scenesToNotSkip);
  } else if (startSceneName) {
    skipToSceneByName(startSceneName, scenesToNotSkip);
  }
  
  await setupWorld(data);

  startButton = document.querySelector('#overlay button');
  startButton.addEventListener('click', start);
}

function start() {
  startButton.removeEventListener('click', start);
  frameFirst = parseInt(document.getElementById('firstframe').value, 10);
  frameLast = parseInt(document.getElementById('lastframe').value, 10);
  document.getElementById('overlay').remove();
  
  if (frameLast > frameFirst) {
    isFastforwarding = frameFirst > 0;
  }

  checkForNextScene(position);

  requestAnimationFrame(isFastforwarding ? skipToStartFrame : isCaptureState ? capture : run);
}

function skipToSceneByIndex(sceneIndex, scenesToNotSkip) {
  if (data.score.length) {
    position = data.score[sceneIndex].lifespan[0];
    origin = performance.now() - position;
    let i = sceneIndex;
    while (--i >= 0) {
      if (scenesToNotSkip.indexOf(data.score[i].object.name) === -1) {
        data.score.splice(i, 1);
      }
    }
  }
}

function skipToSceneByName(sceneName, scenesToNotSkip) {
  if (data.score.length) {
    const sceneIndex = data.score.findIndex(scene => scene.object.name === sceneName);
    skipToSceneByIndex(sceneIndex, scenesToNotSkip);
  }
}

/**
 * Advance through all frames quiickly until the start frame,
 * then capture from there.
 */
function skipToStartFrame() {
  let isNewScene = false;
  let whileCounter = 0;

  while (!isNewScene && frame < frameFirst && whileCounter < SKIP_FRAME_BATCH_SIZE) {
    position += (deltaTime * 1000); // deltaTime = 1 / fps
    isNewScene = checkForNextScene(position);
  
    drawCanvas(frame);
    animateWorld(deltaTime);
    frame += 1;
    whileCounter += 1;
  }
  
  if (frame < frameFirst) {
    requestAnimationFrame(skipToStartFrame);
  } else {
    console.log('skip done', frame);
    isFastforwarding = false;
    videoCanvasesLoadImage();
    requestAnimationFrame(isCaptureState ? capture : run);
  }
}

function run() {
  frameCounter++;
  if (frameCounter % framesPerDraw !== 0) {
    requestAnimationFrame(run);
    return;
  }
  requestAnimationFrame(run);
  
  position += (deltaTime * 1000);
  checkForNextScene(position);
  drawCanvas(frame);
  animateWorld(deltaTime);
  setInfo((position / 1000).toFixed(1));
  frame += 1;
}

function capture() {
  frameCounter++;
  if (frameCounter % framesPerDraw !== 0) {
    requestAnimationFrame(capture);
    return;
  }

  captureCounter++;
  if (captureCounter % captureThrottle !== 0) {
    requestAnimationFrame(capture);
    return;
  }

  if (frameLast > frameFirst && frame > frameLast) {
    console.log('done, reached frameLast', frameLast);
    return;
  }
  
  position += (deltaTime * 1000);
  checkForNextScene(position);
  drawCanvas(frame);
  animateWorld(deltaTime);
  setInfo((position / 1000).toFixed(1));

  // send canvas to node app
  socket.emit('render-frame', {
    frame,
    file: getCanvas().toDataURL(),
  });

  frame += 1;

  // end if this was the last frame
  if (position < data.score[data.score.length - 1].lifespan[1]) {
      requestAnimationFrame(capture);
  } else {
    console.log('done');
  }
}

/**
 * Check for score scenes to start or end.
 * @param {Number} position Time position within the main timeline, in seconds.
 * @returns {Boolean} True if the next scene staarts at possition.
 */
function checkForNextScene(position) {
  let isNewScene = false;

  // check for scenes to start
  if (position >= nextSceneTime) {
    const { canvases, score, } = data;
    for (let i = nextSceneIndex, n = score.length; i < n; i++) {
      const sceneData = score[i];
      const { clipId, lifespan, } = sceneData;
      if (lifespan[0] <= position) {
        nextSceneIndex++;
        nextSceneTime = nextSceneIndex < score.length ? score[nextSceneIndex].lifespan[0] : Number.MAX_VALUE;

        // store the scene end time
        scenes.push({
          clipId,
          lifespan,
        });
        scenes.sort((a, b) => a.lifespan[1] - b.lifespan[1]);

        // create the scene's objects
        loadWorldScene(data, i, position / 1000);
        isNewScene = true;
      } else {

        // not yet time for the next scene
        break;
      }
    }
  }

  // check for scenes to end
  for (let i = scenes.length - 1, n = 0; i >= n; i--) {
    if (position >= scenes[i].lifespan[1]) {
      const scene = data.score.find(scene => scene.clipId === scenes[0].clipId);
      scenes.splice(0, 1);

      // remove the scene
      destroyWorldScene(data, scene.clipId);
    }
  }

  return isNewScene;
}
