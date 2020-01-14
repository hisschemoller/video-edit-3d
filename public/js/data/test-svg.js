import { musicToTime, uuidv4, } from '../app/util.js';

const data = {
  camera: {
    speed: 0,
    position: [1, 1, 6],
    target: [1, 1, 0],
  },
  score: [
    {
      canvases: {
        'main-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 1024 / 2,
          width: 1024,
          height: 1024,
          imageId: 'test3d-image',
        },
      },
      clipId: uuidv4(),
      geometries: [
        {
          depth: 0.1,
          points: [[0.317,0],[0.375,0.16121],[0.375,0.53893],[0.317,0.63159],[0.191,0.63159],[0.142,0.67379],[0.11609,0.82316],[0.174,0.7059],[0.24414,0.67378],[0.317,0.68462],[0.27063,0.91128],[0.317,0.82316],[0.35877,0.75075],[0.40933,0.80155],[0.35877,0.89367],[0.40933,0.94719],[0.41942,0.85989],[0.46636,0.78889],[0.40936,0.73065],[0.43489,0.53898],[0.651,0.57248],[0.70012,0.7059],[0.651,0.91128],[0.758,0.7059],[0.66675,0.50817],[0.43486,0.47277],[0.46636,0.1813],[0.52278,0]],
          type: 'CanvasExtrudeGeometry',
          uuid: 'main-geom',
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
            // MAIN
            canvasId: 'main-canvas',
            castShadow: true,
            geometry: 'main-geom',
            layers: 1,
            material: 'default-mat',
            matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0 ,0,0,0,1],
            receiveShadow: true,
            type: 'Mesh',
            name: 'main-obj',
          },
        ],
      },
      videos: {
        'test3d-image': {
          file: 'testimage3d.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
      },
    }
  ],
  settings: {
    width: 16 * 70,
    height: 9 * 70,
    fps: 30,
  },
};

export default data;
