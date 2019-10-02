import { musicToTime, uuidv4, } from '../app/util.js';

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
  scale: 0.5
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

const clip = {
  animations: {

  },
  clipId: uuidv4(),
  geometries: [
    {
      height: 10,
      type: 'PlaneBufferGeometry',
      uuid: 'ground-1-geom',
      width: 10,
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
    uuid: 'group-1',
    children: [
      {
        castShadow: false,
        geometry: 'ground-1-geom',
        layers: 1,
        material: 'ground-1-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, 0,0,0,1],
        receiveShadow: true,
        type: 'Mesh',
        uuid: 'ground-1',
      },
      {
        ...wallMesh,
        geometry: 'wall-1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -3.6, 0, 3.3, 1],
        uuid: 'scene1wallL1',
      },
      {
        ...wallMesh,
        geometry: 'wall-1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 1.8, 0, 3.3, 1],
        uuid: 'scene1wallR1',
      },
      {
        ...wallMesh,
        geometry: 'wall-2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -2, 0, 2, 1],
        uuid: 'scene1wallL1',
      },
      {
        ...wallMesh,
        geometry: 'wall-2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0.8, 0, 2, 1],
        uuid: 'scene1wallR1',
      },
      {
        ...wallMesh,
        geometry: 'wall-3-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, -2, 0, 0, 1],
        uuid: 'scene1wallL1',
      },
      {
        ...wallMesh,
        geometry: 'wall-3-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
        uuid: 'scene1wallR1',
      },
    ],
  }
};

export default clip;
