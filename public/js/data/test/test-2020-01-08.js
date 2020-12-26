import { musicToTime, uuidv4, } from '../app/util.js';

const data = {
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
      animations: [
        {
          name: 'actor-animation',
          fps: 30,
          tracks: [
            {
              name: 'actor-obj.position',
              type: 'vector3',
              keys: [
                {
                  value: [-2, 0, 0],
                  time: 0.001,
                },
                {
                  value: [0.5, 0, -3.3],
                  time: 75,
                },
                {
                  value: [2.0, 0, 3.3],
                  time: 200,
                },
                {
                  value: [-2, 0, 0],
                  time: 350,
                },
              ],
            }
          ],
        },
      ],
      canvases: {
        's4g-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 102,
          width: 1024,
          height: 1024,
          imageId: 's4-ground-image',
        },
        'box1-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 512,
          width: 512,
          height: 512,
          // imageId: 'test3d-image',
          videoId: 'test3d-video',
        },
        'actor-canvas': {
          offsetX: 0,
          offsetY: 0,
          scale: 128,
          width: 256,
          height: 256,
          // imageId: 'test3d-image',
          videoId: 'test3d-video',
        },
      },
      clipId: uuidv4(),
      geometries: [
        {
          depth: 0.01,
          // points: [ [0, 0], [50, 0], [50, 120], [0, 120] ],
          points: [ [0, 0], [10, 0], [10, 10], [0, 10] ],
          type: 'CanvasExtrudeGeometry',
          uuid: 's4g-geom',
        },
        {
          depth: 1,
          points: [ [0, 0], [1, 0], [1, 1], [0, 1] ],
          type: 'CanvasExtrudeGeometry',
          uuid: 'box1-geom',
        },
        {
          depth: 0.01,
          points: [ [0, 0], [1, 0], [1, 1.5], [0, 1.5] ],
          type: 'CanvasExtrudeGeometry',
          uuid: 'actor-geom',
        },
      ],
      lifespan: [0, Number.MAX_SAFE_INTEGER],
      materials: [
        {
          color: 0xf7f7f7,
          type: 'MeshPhongMaterial',
          uuid: 's4g-mat',
        },
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
            // GROUND
            canvasId: 's4g-canvas',
            castShadow: false,
            geometry: 's4g-geom',
            layers: 1,
            material: 's4g-mat',
            matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,5,1],
            receiveShadow: true,
            type: 'Mesh',
            name: 's4g-obj',
          },
          {
            // BOX
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
          {
            // ACTOR
            canvasId: 'actor-canvas',
            castShadow: true,
            geometry: 'actor-geom',
            layers: 1,
            material: 'default-mat',
            matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0 ,-2,-1,0,1],
            receiveShadow: true,
            type: 'Mesh',
            name: 'actor-obj',
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
        's4-ground-image': {
          file: 'ground.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
        'test3d-image': {
          file: 'testimage3d.jpg',
          offsetX: 0,
          offsetY: 1024,
          scale: 1,
        },
        'test3d-video': {
          end: 146,
          isLoop: true,
          offsetX: 0,
          offsetY: 360,
          resourceId: 'dublin',
          scale: 512 / 360,
          start: 0,
        },
      }
    },
  ],
  settings: {
    width: 16 * 70,
    height: 9 * 70,
    fps: 30,
  },
};

/**
 * Add animating object to the scene.
 * @param {*} config 
 */
function createActor(config) {
  const {
    i: sceneIndex = 0,
    x0: fromX = -2,
    x1: toX = 2.5,
    z = -2,
    t0: startTime = 0,
    t1: endTime = 150,
    gw: geomWidth = 1,
    gh: geomHeight = 1.5,
    path,
    videoResource,
  } = config;
  
  const scene = data.score[sceneIndex];
  const objId = config.objId || uuidv4();
  const geomId = uuidv4();

  // points are custom path or else rectangle
  const points = path ? path : [ [0, 0], [geomWidth, 0], [geomWidth, geomHeight], [0, geomHeight] ];

  // add the animation
  scene.animations[0].tracks.push({
    name: `${objId}.position`,
    type: 'vector3',
    keys: [
      {
        value: [fromX, 0, z],
        time: startTime,
      },
      {
        value: [toX, 0, z],
        time: endTime,
      },
    ],
  });

  // add canvas
  const canvasId = uuidv4();
  scene.canvases[canvasId] = {
    offsetX: 128,
    offsetY: 128,
    scale: 64,
    width: 256,
    height: 256,
  };

  // canvas shows video or image
  if (videoResource) {
    const videoId = uuidv4();

    // add video
    scene.videos[videoId] = {
      end: 146,
      isLoop: true,
      offsetX: 0,
      offsetY: 480,
      resourceId: videoResource,
      scale: 1,
      start: 0,
    };

    scene.canvases[canvasId].videoId = videoId;
  } else {
    scene.canvases[canvasId].imageId = 'test3d-image';
  }

  scene.geometries.push({
    depth: 0.01,
    points,
    type: 'CanvasExtrudeGeometry',
    uuid: geomId,
  });

  scene.object.children.push({
    canvasId,
    castShadow: true,
    geometry: geomId,
    layers: 1,
    material: 'default-mat',
    matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0 ,fromX,0,z,1],
    receiveShadow: true,
    type: 'Mesh',
    name: objId,
  });
}

// createActor({});
// createActor({ t0: 150, t1: 300});
// createActor({ t0: 75, t1: 225, 
//   path: [[1.3045529541704735,0],[1.5390866820295348,1.1103535732304297],[1.0277213412056672,2],[0.07442355154969524,1.2938353082345884]], 
// });`
// createActor({ videoResource: 'dublin', t0: 75, t1: 225, });

export default data;
