import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const videoScene4 = {
  resourceId: 'leidseplein4',
  start: 20,
  end: 146,
  isLoop: true,
  offsetX: 0,
  offsetY: 480,
  scale: 1,
};

const defaultMesh = {
  castShadow: true,
  geometry: 's4w1-geom',
  layers: 1,
  material: 'default-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0,0,0,1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 's4-obj',
};

const start = fps * 30;

const wall1Pos = [-6, 0, -12];
const concertPos = [-7, 0, -10];
const modernePos = [4.5, 0, -12];
const maisonPos = [-1, 0, -15];

const scene = {
  canvases: {
    's4g-canvas': {
      ...canvas,
      videoId: 's4g-video',
    },
    's4-concert-canvas': {
      ...canvas,
      offsetX: 0,
      offsetY: 310,
      scale: 30,
      videoId: 's4-concert-video',
    },
    's4-moderne-canvas': {
      ...canvas,
      // offsetX: 0,
      // offsetY: 256,
      scale: 40,
      videoId: 's4-moderne-video',
    },
    's4-maison-canvas': {
      ...canvas,
      scale: 40,
      videoId: 's4-maison-video',
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
      depth: 3,
      points: [ [0, 0], [5, 0], [5, 6.5], [0, 6.5] ],
      uuid: 's4-concert-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 3,
      points: [ [0, 0], [3, 0], [3, 6], [1, 6], [0, 5] ],
      uuid: 's4-moderne-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 2,
      points: [ [0, 0], [5, 0], [5, 4], [0.5, 4], [0, 3.5] ],
      uuid: 's4-maison-geom',
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
    name: 'scene4',
    uuid: 'scene4',
    children: [
      {
        // GROUND
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
        // CONCERTGEBOUW
        ...defaultMesh,
        canvasId: 's4-concert-canvas',
        geometry: 's4-concert-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...concertPos, 1],
        name: 's4-concert-obj',
      },
      {
        // CAFE MODERNE / HEINEKENHOEK
        ...defaultMesh,
        canvasId: 's4-moderne-canvas',
        geometry: 's4-moderne-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...modernePos, 1],
        name: 's4-moderne-obj',
      },
      {
        // MAISON DE VRIES
        ...defaultMesh,
        canvasId: 's4-maison-canvas',
        geometry: 's4-maison-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...maisonPos, 1],
        name: 's4-maison-obj',
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
      offsetY: 91,
      repeat: 'repeat',
      scale: 1,
    },
    's4-concert-video': {
      ...videoScene4,
      offsetX: 0,
      offsetY: 480 - 200,
      scale: 0.70,
    },
    's4-moderne-video': {
      ...videoScene4,
      offsetX: 550,
      offsetY: 480 - 210,
      scale: 1.3,
    },
    's4-maison-video': {
      ...videoScene4,
      offsetX: 330,
      offsetY: 480 - 210,
      scale: 1.15,
    },
  },
};

export default scene;
