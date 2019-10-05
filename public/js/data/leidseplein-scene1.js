import { musicToTime, uuidv4, } from '../app/util.js';

const fps = 30;

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const videoScene1 = {
  resourceId: 'leidseplein1',
  start: 140,
  end: 210,
  isLoop: true,
  offsetX: 0,
  offsetY: 0,
  scale: 0.5,
};

const wallMesh = {
  castShadow: true,
  geometry: 'wall-1-geom',
  layers: 1,
  material: 'wall-1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 'scene1wallR1',
};

const wall1LPos = [-3.6, 0, 3.3];
const wall1RPos = [1.8, 0, 3.3];

const wall1start = fps * 1;
const wall1End = fps * 30;

const scene = {
  animations: [
    {
      loop: THREE.LoopOnce,
      name: 'scene1Animation',
      fps,
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
              value: [-5.6, 0, 3.3],
              time: wall1End,
            },
            {
              value: [-5, 0, 3.3],
              time: Number.MAX_SAFE_INTEGER,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'scene1wallR1.position',
          type: 'vector3',
          keys: [
            {
              value: [1.8, 0, 3.3],
              time: wall1start,
            },
            {
              value: [3.8, 0, 3.3],
              time: wall1End,
            },
            {
              value: [3.8, 0, 3.3],
              time: Number.MAX_SAFE_INTEGER,
            },
          ],
        },
      ],
    },
  ],
  canvases: {
    'scene1ground-canvas': {
      ...canvas,
      scale: 20,
      videoId: 'scene1ground-video',
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
      points: [ [0, 0], [10, 0], [10, 10], [0, 10] ],
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
      points: [ [0, 0], [1.2, 0], [1.2, 4], [0, 4] ],
      uuid: 'wall-2-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [2, 0], [2, 4], [0, 4] ],
      uuid: 'wall-3-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  lifespan: [0, Number.POSITIVE_INFINITY],
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
    name: 'group-1',
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
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -2, 0, 2, 1],
        name: 'scene1wallL2',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallR2-canvas',
        geometry: 'wall-2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0.8, 0, 2, 1],
        name: 'scene1wallR2',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallL3-canvas',
        geometry: 'wall-3-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -2, 0, 0, 1],
        name: 'scene1wallL3',
      },
      {
        ...wallMesh,
        canvasId: 'scene1wallR3-canvas',
        geometry: 'wall-3-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
        name: 'scene1wallR3',
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
    'scene1wallL1-video': {
      ...videoScene1,
    },
    'scene1wallR1-video': {
      ...videoScene1,
      offsetX: 400,
    },
    'scene1wallL2-video': {
      ...videoScene1,
      offsetX: 50,
      // start: videoScene1.start - 2,
    },
    'scene1wallR2-video': {
      ...videoScene1,
      offsetX: 320,
      // start: videoScene1.start - 1,
    },
    'scene1wallL3-video': {
      ...videoScene1,
      offsetX: 50,
      // start: videoScene1.start + 1,
    },
    'scene1wallR3-video': {
      ...videoScene1,
      offsetX: 285,
    },
  },
};

export default scene;
