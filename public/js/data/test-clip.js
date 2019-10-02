import { musicToTime, uuidv4, } from '../app/util.js';

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
      depth: 0.5,
      height: 1,
      type: 'BoxBufferGeometry',
      uuid: 'box-1-geom',
      width: 2,
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
      uuid: 'box-1-mat',
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
        castShadow: true,
        geometry: 'box-1-geom',
        layers: 1,
        material: 'box-1-mat',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0,0.5,0,1],
        receiveShadow: true,
        type: 'Mesh',
        uuid: 'box-1',
      },
    ],
  }
};

export default clip;
