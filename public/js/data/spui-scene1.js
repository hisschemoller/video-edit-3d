import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './spui-shared.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const scene = {
  animations: [],
  canvases: {
    's1-ground-canvas': {
      offsetX: 0,
      offsetY: 0,
      scale: 1024 / 10,
      width: 1024,
      height: 1024,
      imageId: 's1-ground-image',
    },
  },
  clipId: uuidv4(),
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [10, 0], [10, 10], [0, 10] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 's1-ground-geom',
    },
  ],
  lifespan: [0,9999],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 's1-ground-mat',
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
        canvasId: 's1-ground-canvas',
        castShadow: false,
        geometry: 's1-ground-geom',
        layers: 1,
        material: 's1-ground-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,5,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 's1-ground-obj',
      },
    ],
  },
  media: {
    's1-ground-image': {
      file: 'spui/spui-ground.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
    },
  },
};

export default scene;