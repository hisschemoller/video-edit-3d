import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

export const wallMesh = {
  castShadow: true,
  geometry: 's2w1-geom',
  layers: 1,
  material: 's2w1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 'scene2wall',
};

const videoScene2 = {
  resourceId: 'leidseplein2',
  start: 140,
  end: 210,
  isLoop: true,
  offsetX: 0,
  offsetY: 0,
  scale: 0.5,
};

const wall1LPos = [-2.67, 0, -2];
const wall1LPos2 = [-8, 0, 0];
const wall1RPos = [0, 0, -2];
const wall1RPos2 = [4, 0, 0];

const scene = {
  animations: [
    {
      loop: THREE.LoopOnce,
      name: 'scene2Animation',
      fps,
      tracks: [
      ],
    },
  ],
  canvases: {
    's2wl1-canvas': {
      ...canvas,
      videoId: 'scene2wallL1-video',
    },
    's2wr1-canvas': {
      ...canvas,
      videoId: 'scene2wallR1-video',
    },
  },
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [2.67, 0], [2.67, 4], [0, 4] ],
      uuid: 's2w1-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [40, 150],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 'ground2-mat',
    },
    {
      color: 0xffdd99,
      type: 'MeshPhongMaterial',
      uuid: 's2w1-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene2',
    children: [
      {
        ...wallMesh,
        canvasId: 's2wl1-canvas',
        geometry: 's2w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1LPos, 1],
        name: 's2w1l',
      },
      {
        ...wallMesh,
        canvasId: 's2wr1-canvas',
        geometry: 's2w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1RPos, 1],
        name: 's2w1r',
      },
    ],
  },
  videos: {
    'scene1ground-video': {
      resourceId: 'stoep',
      start: 0,
      end: 13,
      isLoop: true,
      offsetX: 0,
      offsetY: 0,
      repeat: 'repeat',
      scale: 1, 
    },
    'scene2wallL1-video': {
      ...videoScene2,
      offsetX: 0,
    },
    'scene2wallR1-video': {
      ...videoScene2,
      offsetX: 320,
    },
  },
};

export default scene;
