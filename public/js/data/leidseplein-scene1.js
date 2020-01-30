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
  geometry: 'wall-1-geom',
  layers: 1,
  material: 'wall-1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 'scene1wallR1',
};

const videoScene1 = {
  end: 210,
  isLoop: true,
  keys: [
    {
      time: 0,
      value: [0, 480],
    },
  ],
  resourceId: 'leidseplein1',
  scale: 0.5,
  start: 140,
};

const wall1LPos = [-3.6, 0, 3.3];
const wall1LPos2 = [-5.1, 0, 3.3];
const wall1RPos = [1.8, 0, 3.3];
const wall1RPos2 = [3.3, 0, 3.3];

const wall1start = fps * 1;
const wall1End = fps * 30;

const wall2LPos = [-4, 0, 2];
const wall2LPos2 = [-6, 0, 2];
const wall2RPos = [0.8, 0, 2];
const wall2RPos2 = [2.8, 0, 2];

const wall2start = fps * 25;
const wall2End = fps * 55;

const wall3LPos = [-4, 0, 0];
const wall3LPos2 = [-8, 0, 0];
const wall3RPos = [0, 0, 0];
const wall3RPos2 = [4, 0, 0];

const wall3start = fps * 40;
const wall3End = fps * 80;

const scene = {
  animations: [
    {
      duration: 90,
      fps,
      loop: THREE.LoopOnce,
      name: 'scene1Animation',
      tracks: [
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallL1.position',
          type: 'vector3',
          keys: [
            {
              value: wall1LPos,
              time: wall1start,
            },
            {
              value: wall1LPos2,
              time: wall1End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallR1.position',
          type: 'vector3',
          keys: [
            {
              value: wall1RPos,
              time: wall1start,
            },
            {
              value: wall1RPos2,
              time: wall1End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallL2.position',
          type: 'vector3',
          keys: [
            {
              value: wall2LPos,
              time: wall2start,
            },
            {
              value: wall2LPos2,
              time: wall2End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallR2.position',
          type: 'vector3',
          keys: [
            {
              value: wall2RPos,
              time: wall2start,
            },
            {
              value: wall2RPos2,
              time: wall2End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallL3.position',
          type: 'vector3',
          keys: [
            {
              value: wall3LPos,
              time: wall3start,
            },
            {
              value: wall3LPos2,
              time: wall3End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallR3.position',
          type: 'vector3',
          keys: [
            {
              value: wall3RPos,
              time: wall3start,
            },
            {
              value: wall3RPos2,
              time: wall3End,
            },
          ],
        },
      ],
    },
  ],
  canvases: {
    'scene1ground-canvas': {
      offsetX: 0,
      offsetY: 0,
      scale: 1024 / 10,
      width: 1024,
      height: 1024,
      imageId: 's1-ground-image',
    },
    'scene1wallL1-canvas': {
      ...canvas,
      videoId: 'scene1wallL1-video',
    },
    'scene1wallR1-canvas': {
      ...canvas,
      videoId: 'scene1wallR1-video',
    },
    'scene1wallL2-canvas': {
      ...canvas,
      videoId: 'scene1wallL2-video',
    },
    'scene1wallR2-canvas': {
      ...canvas,
      videoId: 'scene1wallR2-video',
    },
    'scene1wallL3-canvas': {
      ...canvas,
      videoId: 'scene1wallL3-video',
    },
    'scene1wallR3-canvas': {
      ...canvas,
      videoId: 'scene1wallR3-video',
    },
  },
  clipId: uuidv4(),
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [10, 0], [10, 5], [0, 5] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 'ground-1-geom',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [1.8, 0], [1.8, 4], [0, 4] ],
      uuid: 'wall-1-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [3.2, 0], [3.2, 4], [0, 4] ],
      uuid: 'wall-2-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [4, 0], [4, 4], [0, 4] ],
      uuid: 'wall-3-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  lifespan: [0, 90],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 'ground-1-mat',
    },
    {
      color: 0xffdd99,
      type: 'MeshPhongMaterial',
      uuid: 'wall-1-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene1',
    uuid: 'scene1',
    children: [
      {
        canvasId: 'scene1ground-canvas',
        castShadow: false,
        geometry: 'ground-1-geom',
        layers: 1,
        material: 'ground-1-mat',
     // matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, 0,0,0,1],
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,5,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 'ground-1',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallL1-canvas',
        geometry: 'wall-1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1LPos, 1],
        name: 'scene1wallL1',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallR1-canvas',
        geometry: 'wall-1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1RPos, 1],
        name: 'scene1wallR1',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallL2-canvas',
        geometry: 'wall-2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall2LPos, 1],
        name: 'scene1wallL2',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallR2-canvas',
        geometry: 'wall-2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall2RPos, 1],
        name: 'scene1wallR2',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallL3-canvas',
        geometry: 'wall-3-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall3LPos, 1],
        name: 'scene1wallL3',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallR3-canvas',
        geometry: 'wall-3-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall3RPos, 1],
        name: 'scene1wallR3',
      },
    ],
  },
  videos: {
    's1-ground-image': {
      file: 'leidseplein-ground.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
    },
    'scene1wallL1-video': {
      ...videoScene1,
    },
    'scene1wallR1-video': {
      ...videoScene1,
      keys: [ { ...videoScene1.keys[0], value: [ 400, videoScene1.keys[0].value[1] ] } ],
      // offsetX: 400,
    },
    'scene1wallL2-video': {
      ...videoScene1,
      keys: [ { ...videoScene1.keys[0], value: [ -50, videoScene1.keys[0].value[1] ] } ],
      // start: videoScene1.start - 2,
    },
    'scene1wallR2-video': {
      ...videoScene1,
      keys: [ { ...videoScene1.keys[0], value: [ 320, videoScene1.keys[0].value[1] ] } ],
      // start: videoScene1.start - 1,
    },
    'scene1wallL3-video': {
      ...videoScene1,
      keys: [ { ...videoScene1.keys[0], value: [ -190, videoScene1.keys[0].value[1] ] } ],
      // start: videoScene1.start + 1,
    },
    'scene1wallR3-video': {
      ...videoScene1,
      keys: [ { ...videoScene1.keys[0], value: [ 285, videoScene1.keys[0].value[1] ] } ],
    },
  },
};

export default scene;
