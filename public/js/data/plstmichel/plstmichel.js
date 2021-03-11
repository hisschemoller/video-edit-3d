import { fps, } from './plstmichel-shared.js';
import sceneWalls from './plstmichel-walls.js';
import sceneObjects from './plstmichel-objects.js';
import sceneActors from './plstmichel-actors.js';

/**
 * All data.
 */
const data = {
  settings: {
    backgroundImage: 'plstmichel/plstmichel-lucht.jpg',
    width: 16 * 50,
    height: 9 * 50,
    fps,
  },
  camera: {
    speed: 0,
    fieldOfView: 40,
    position: [0, 1.8, -1],
    rotation: [0, 0, 0, 0],
    target: [0, 1.8, 0],
    parentName: 'cameraParent',
  },
  gltfFiles: ['plstmichel.glb'],
  resources: [
    {
      id: '30seconds',
      url: 'frames/30seconds/frame_#.png',
      frames: 900,
      fps: 30,
      width: 640,
      height: 360,
    },
    {
      id: '1585_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1585_preview/&img=frame_#.png',
      frames: 3301,
      fps: 30,
      width: 480,
      height: 270,
    },
  ],
  score: [
    sceneWalls,
    sceneObjects,
    // sceneActors,
  ],
};

export default data;
