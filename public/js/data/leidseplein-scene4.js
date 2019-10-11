import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const wallMesh = {
  castShadow: true,
  geometry: 's4w1-geom',
  layers: 1,
  material: 's4w1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 's4w-obj',
};

const videoScene4 = {
  resourceId: 'leidseplein4',
  start: 0,
  end: 146,
  isLoop: true,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
};

const start = fps * 30;

const wall1Pos = [-6, 0, -12];

const scene = {
  animations: [
    {
      duration: 110,
      loop: THREE.LoopOnce,
      name: 's4-anim',
      fps,
      tracks: [
        {
          interpolation: THREE.InterpolateSmooth,
          name: 's3w1-obj.height',
          type: 'vector3',
          keys: [
            {
              value: 3,
              time: 1,
            },
            {
              value: 4,
              time: 4,
            },
          ],
        },
      ],
    },
  ],
  canvases: {
    's4g-canvas': {
      ...canvas,
      videoId: 's4g-video',
    },
    's4w1-canvas': {
      ...canvas,
      offsetX: 0,
      offsetY: 310,
      scale: 42.2,
      videoId: 's4w1-video',
    },
  },
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [10, 0], [10, 15], [0, 15] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 's4g-geom',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [12, 0], [12, 4], [0, 4] ],
      uuid: 's4w1-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [120, 200],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 's4g-mat',
    },
    {
      color: 0xffdd99,
      type: 'MeshPhongMaterial',
      uuid: 's4w1-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene4',
    uuid: 'scene4',
    children: [
      {
        canvasId: 's4g-canvas',
        castShadow: false,
        geometry: 's4g-geom',
        layers: 1,
        material: 's4g-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,-2,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 's4g-obj',
      },
      {
        ...wallMesh,
        canvasId: 's4w1-canvas',
        geometry: 's4w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1Pos, 1],
        name: 's4w1-obj',
      },
    ],
  },
  videos: {
    's4g-video': {
      resourceId: 'stoep',
      start: 0,
      end: 13,
      isLoop: true,
      offsetX: 0,
      offsetY: 0,
      repeat: 'repeat',
      scale: 1,
    },
    's4w1-video': {
      ...videoScene4,
      offsetX: 0,
      offsetY: 0,
      scale: 0.78,
    },
  },
};

export default scene;
