import { musicToTime, uuidv4, } from '../app/util.js';

const data = {
  camera: {
    speed: 0,
    position: [8, 4.5, 22],
    target: [8, 4.5, 0],
  },
  resources: [
    {
      id: 'dublin',
      url: 'frames/dublin/frame_#.png',
      frames: 15829,
      fps: 30,
      width: 480,
      height: 360,
    },
  ],
  score: [
    {
      canvases: {
        'main-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 1024 / 16,
          width: 1024,
          height: 1024,
          // imageId: 'test-frame',
          videoId: 'test3d-video',
        },
      },
      clipId: uuidv4(),
      geometries: [
        {
          depth: 1,
          points: [ [0, 0], [16, 0], [16, 9], [0, 9] ],
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
        'test-frame': {
          file: 'frame_00001-dublin.png',
          offsetX: 0,
          offsetY: 360,
          scale: 1024 / 480,
        },
        'test3d-video': {
          end: 146,
          isLoop: true,
          offsetX: 0,
          offsetY: 360,
          resourceId: 'dublin',
          scale: 1024 / 480,
          start: 0,
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
