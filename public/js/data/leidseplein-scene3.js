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
  geometry: 's3w1-geom',
  layers: 1,
  material: 's3w1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 's3w-obj',
};

const videoScene3 = {
  resourceId: 'leidseplein3a',
  start: 0,
  end: 146,
  isLoop: true,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
};

const scene = {
  animations: [
    {
      duration: 110,
      loop: THREE.LoopOnce,
      name: 's3-anim',
      fps,
      tracks: [
      ],
    },
  ],
  canvases: {
    's3g-canvas': {
      ...canvas,
      videoId: 's3g-video',
    },
    's3wl1-canvas': {
      ...canvas,
      scale: 60,
      videoId: 's3wl1-video',
    },
    's3wr1-canvas': {
      ...canvas,
      scale: 60,
      videoId: 's3wr1-video',
    },
    's3wl2-canvas': {
      ...canvas,
      scale: 45,
      videoId: 's3wl2-video',
    },
    's3wr2-canvas': {
      ...canvas,
      scale: 40,
      videoId: 's3wr2-video',
    },
    's3p1-canvas': {
      ...canvas,
      scale: 55,
      videoId: 's3p1-video',
    },
  },
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [10, 0], [10, 15], [0, 15] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 's3g-geom',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [2.67, 0], [2.67, 4], [0, 4] ],
      uuid: 's3w1-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [4, 0], [4, 4], [0, 4] ],
      uuid: 's3w2-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [0.3, 0], [0.2, 6.5], [0.1, 6.5] ],
      uuid: 's3p1-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [105, 200],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 's3g-mat',
    },
    {
      color: 0xffdd99,
      type: 'MeshPhongMaterial',
      uuid: 's3w1-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene3',
    uuid: 'scene3',
    children: [
      {
        canvasId: 's3g-canvas',
        castShadow: false,
        geometry: 's3g-geom',
        layers: 1,
        material: 's3g-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,-2,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 's3g-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wl1-canvas',
        geometry: 's3w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -2.67, 0, -12, 1],
        name: 's3w1l-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wr1-canvas',
        geometry: 's3w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, -12, 1],
        name: 's3w1r-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wl2-canvas',
        geometry: 's3w2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -5.8, 0, -9.6, 1],
        rotateY: Math.PI / 5,
        name: 's3w2l-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wr2-canvas',
        geometry: 's3w2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 2.5, 0, -12, 1],
        rotateY: Math.PI / -5,
        name: 's3w2r-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3p1-canvas',
        geometry: 's3p1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 1, 0, -7, 1],
        // rotateY: Math.PI / -5,
        name: 's3p1-obj',
      },
    ],
  },
  videos: {
    's3g-video': {
      resourceId: 'stoep',
      start: 0,
      end: 13,
      isLoop: true,
      offsetX: 0,
      offsetY: 0,
      repeat: 'repeat',
      scale: 1, 
    },
    's3wl1-video': {
      ...videoScene3,
      offsetX: 270,
      offsetY: 150,
    },
    's3wr1-video': {
      ...videoScene3,
      offsetX: 350,
      offsetY: 150,
    },
    's3wl2-video': {
      ...videoScene3,
      offsetX: 80,
      offsetY: 165,
    },
    's3wr2-video': {
      ...videoScene3,
      offsetX: 480,
      offsetY: 175,
    },
    's3p1-video': {
      ...videoScene3,
      offsetX: 290,
      offsetY: 175,
    },
  },
};

export default scene;
