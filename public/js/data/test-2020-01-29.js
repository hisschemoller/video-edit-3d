import { musicToTime, uuidv4, } from '../app/util.js';
import createActor from '../app/actor.js';

const fps = 30;
const start = 1;
const startPos = [-1, 0, -4];

console.log('THREE', THREE);

const data = {
  camera: {
    speed: -0.001,
    position: [0, 2, 10],
    target: [0, 2, 0],
  },
  resources: [
    {
      id: '30seconds',
      url: 'frames/30seconds/frame_#.png',
      frames: 900,
      fps,
      width: 640,
      height: 360,
    },
    {
      id: 'dublin',
      url: 'frames/dublin/frame_#.png',
      frames: 15829,
      fps: 30,
      width: 480,
      height: 360,
    },
  ],
  score: [
    {
      animations: [
        {
          duration: 90,
          fps,
          loop: THREE.LoopOnce,
          name: 'testAnimation',
          tracks: [],
        },
      ],
      canvases: {
        'ground-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 1024 / 10,
          width: 1024,
          height: 1024,
          imageId: 'ground-image',
        },
        'object1-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 512 / 2,
          width: 512,
          height: 512,
          videoId: 'dublin-video',
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
        {
          depth: 0.01,
          points: [ [0, 0], [2, 0], [2, 1.5], [0, 1.5] ],
          type: 'CanvasExtrudeGeometry',
          uuid: 'object1-geom',
        },
      ],
      lifespan: [0, Number.MAX_SAFE_INTEGER],
      materials: [
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
            material: 'default-mat',
            matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,0,1],
            receiveShadow: true,
            type: 'Mesh',
            name: 'ground-obj',
          },
          // OBJECT1
          {
            canvasId: 'object1-canvas',
            castShadow: false,
            geometry: 'object1-geom',
            layers: 1,
            material: 'default-mat',
            matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...startPos, 1],
            receiveShadow: true,
            type: 'Mesh',
            name: 'object1',
          }
        ],
      },
      videos: {
        'ground-image': {
          file: 'leidseplein-ground.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
        'test3d-image': {
          file: 'testimage3d.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
        'dublin-video': {
          end: 146, // end time of the video
          isLoop: true, // loop from end frame back to start frame
          resourceId: '30seconds',
          scale: 512 / (640 / 2),
          start: 0, // start time of the video
          keys: [
            {
              time: 0,
              value: [0, 360],
            },
            {
              time: 1,
              value: [240, 360],
            },
            {
              time: 2,
              value: [0, 360],
            },
            {
              time: 3,
              value: [120, 360],
            },
          ],
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
// video eerst stilstaand 90 - 150, dan animerend loop 0 - 150
// createActor(data.score[0], {
//   gw: 1.6, gh: 0.9, z: -9, x0: -4, x1: 4, t0: 2 * 30, t1: 7 * 30, // measured in frames
//   cSc: 320, cOf: 0,
//   vOx: 0, vOy: 360, vOx2: 0, vSc: 0.8, vt0: 0, vt1: 5, vt0i: 3, // measured in seconds
//   videoResourceId: '30seconds',
// });

export default data;
