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
          depth: 1,
          points: [
            [0.14123642836677092,0],
            [0.14123642836677092,1],
            [0.20140578040320178,0.5468583307424545]],
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
