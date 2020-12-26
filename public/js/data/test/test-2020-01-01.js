import { musicToTime, uuidv4, } from '../app/util.js';

export default {
  camera: {
    speed: 0,
    position: [0, 2, 10],
    target: [0, 0, 0],
  },
  resources: [
    {
      id: 'leidseplein1',
      url: 'frames/leidseplein1/frame_#.png',
      frames: 6303,
      fps: 30,
      width: 640,
      height: 480,
    },
  ],
  settings: {
    width: 16 * 70,
    height: 9 * 70,
    fps: 30,
  },
  score: [
    {
      canvases: {
        'box1-canvas': {
          offsetX: 256,
          offsetY: 256,
          scale: 128,
          width: 512,
          height: 512,
          // videoId: 'leidseplein1-video',
          imageId: 'test3d-image',
        },
      },
      clipId: uuidv4(),
      geometries: [
        {
          depth: 1,
          points: [ [0, 0], [1, 0], [1, 1], [0, 1] ],
          type: 'CanvasExtrudeGeometry',
          uuid: 'box1-geom',
        },
      ],
      lifespan: [0, Number.MAX_SAFE_INTEGER],
      materials: [
        {
          color: 0xf7f7f7,
          type: 'MeshPhongMaterial',
          uuid: 'box1-mat',
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
            canvasId: 'box1-canvas',
            castShadow: true,
            geometry: 'box1-geom',
            layers: 1,
            material: 'box1-mat',
            matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0 ,0,0,0,1],
            receiveShadow: true,
            type: 'Mesh',
            name: 'box1-obj',
          },
        ],
      },
      videos: {
        'leidseplein1-video': {
          end: 146,
          isLoop: true,
          offsetX: 0,
          offsetY: 480,
          resourceId: 'leidseplein1',
          scale: 1,
          start: 0,
        },
        'test3d-image': {
          file: 'testimage3d.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
      }
    },
  ],
}
