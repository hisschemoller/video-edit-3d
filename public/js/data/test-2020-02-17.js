import { musicToTime, uuidv4, } from '../app/util.js';
import createActor from '../app/actor.js';

const fps = 30;

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
      fps: 30,
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
      }
    },
  ],
  settings: {
    width: 480,
    height: 360,
    fps: 30,
  },
};

// 30 SECONDS
createActor(data.score[0], fps, {
  keys: [
    { t: 0, v: [-1, 0, 0] },
    { t: 4, v: [ 1, 0, 0] },
  ],
  vKeys: [
    { t: 0, v: [        0, 360] },
    { t: 4, v: [640 - 360, 360] },
  ],
  vSc: 256 / 360,
  vt: [0, 30],
  vrid: '30seconds',
});

// video eerst stilstaand 90 - 150, dan animerend loop 0 - 150
// createActor(data.score[0], {
//   gw: 1.6, gh: 0.9, z: -9, x0: -4, x1: 4, t0: 2 * 30, t1: 7 * 30, // measured in frames
//   cSc: 320, cOf: 0,
//   vOx: 0, vOy: 360, vOx2: 0, vSc: 0.8, vt0: 0, vt1: 5, vt0i: 3, // measured in seconds
//   videoResourceId: '30seconds',
// });

export default data;
