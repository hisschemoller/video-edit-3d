import { musicToTime, uuidv4, } from '../app/util.js';
import createActor from '../app/actor.js';

const data = {
  camera: {
    speed: 0,
    position: [0, 2, 10],
    target: [0, 2, 0],
  },
  resources: [
    {
      id: '30seconds',
      url: 'frames/30seconds/frame_#.png',
      frames: 900,
      fps: 30,
      width: 640,
      height: 360,
    },
  ],
  score: [
    {
      animations: [
        {
          name: 'actor-animation',
          fps: 30,
          tracks: [
          ],
        },
      ],
      canvases: {
        'ground-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 1024 / 10,
          width: 1024,
          height: 1024,
          // imageId: 'ground-image',
        },
      },
      clipId: uuidv4(),
      geometries: [
        {
          depth: 0.01,
          points: [ [0, 0], [10, 0], [10, 10], [0, 10] ],
          type: 'CanvasExtrudeGeometry',
          uuid: 'ground-geom',
        },
      ],
      lifespan: [0, Number.MAX_SAFE_INTEGER],
      materials: [
        {
          color: 0x006600,
          type: 'MeshPhongMaterial',
          uuid: 'ground-mat',
        },
        {
          color: 0xf7f7f7,
          type: 'MeshPhongMaterial',
          uuid: 'default-mat',
        },
      ],
      metadata: {
        generator: 'Wouter Hisschemöller',
        type: 'Object',
        version: 4.3,
      },
      object: {
        type: 'Group',
        name: 'group',
        uuid: 'group',
        children: [
          {
            // GROUND
            canvasId: 'ground-canvas',
            castShadow: false,
            geometry: 'ground-geom',
            layers: 1,
            material: 'ground-mat',
            matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,0,1],
            receiveShadow: true,
            type: 'Mesh',
            name: 'ground-obj',
          },
        ],
      },
      videos: {
        'ground-image': {
          file: 'leidseplein-ground.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
      }
    },
  ],
  settings: {
    width: 16 * 70,
    height: 9 * 70,
    fps: 30,
  },
};

// 30 SECONDS
const animStart = 2;
const videoStart = 0;
const videoDuration = 900 / 30;
const videoAdjustedStart = videoDuration - (animStart % videoDuration);
console.log('videoAdjustedStart', videoAdjustedStart);
createActor(data.score[0], {
  gw: 1.6, gh: 0.9, z: -4, x0: -4, x1: 4, t0: 2 * data.settings.fps, t1: data.settings.fps * 7, // measures in frames
  cSc: 320, cOf: 0,
  vOx: 0, vOy: 360, vOx2: 0, vSc: 0.8, vt0: videoAdjustedStart, vt1: videoDuration, // measured in seconds
  videoResourceId: '30seconds',
});

export default data;
