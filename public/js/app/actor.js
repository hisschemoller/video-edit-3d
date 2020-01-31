import { musicToTime, uuidv4, } from '../app/util.js';

/**
 * Add animating object to the scene.
 * @param {Object} scene
 * @param {Number} fps
 * @param {Object} config
 */
export default function createActor(scene, fps, config) {
  console.log('A', scene, fps, config);
  const {

    // object position and animation
    x0: fromX = -2,
    x1: toX = 2.5,
    z = -2,
    t0: startTime = 0, // in seconds
    t1: endTime = 10, // in seconds

    // geometry
    gw: geomWidth = 1, gh: geomHeight = 1.5,
    path,

    // canvas
    cSz: canvasSize = 512, cSc: canvasScale = 256, cOf: canvasOffset = 128,

    // video
    videoResourceId,
    vSc: videoScale = 1,
    vKeys = [{t: 0, v: [  0, 0]}],
    vt0: videoStartTime = 0, vt1: videoEndTime, vt0i: videoStartTimeInitial = config.vt0,
    // vOx: videoOffsetX = 0, vOy: videoOffsetY = 0, vOx2: videoOffsetX2 = 0,
    
  } = config;
  
  // const scene = data.score[sceneIndex];
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
        time: startTime * fps,
      },
      {
        value: [toX, 0, z],
        time: endTime * fps,
      },
    ],
  });

  // add canvas
  const canvasId = uuidv4();
  scene.canvases[canvasId] = {
    offsetX: canvasOffset,
    offsetY: canvasOffset,
    scale: canvasScale,
    width: canvasSize,
    height: canvasSize,
  };

  // canvas shows video or image
  if (videoResourceId) {
    const videoId = uuidv4();

    // add video
    scene.videos[videoId] = {
      end: videoEndTime,
      isLoop: true,
      keys: vKeys.map(key => ({ time: key.t, value: [ ...key.v ]})),
      // keys: [
      //   {
      //     time: startTime,
      //     value: [videoOffsetX, videoOffsetY],
      //   },
      //   {
      //     time: endTime,
      //     value: [videoOffsetX2, videoOffsetY],
      //   },
      // ],
      // offsetX: videoOffsetX,
      // offsetY: videoOffsetY,
      // offsetX2: videoOffsetX2,
      resourceId: videoResourceId,
      scale: videoScale,
      start: videoStartTime,
      startInitial: videoStartTimeInitial,
    };
    console.log(scene.videos[videoId]);

    scene.canvases[canvasId].videoId = videoId;
  } else {
    scene.canvases[canvasId].imageId = 'test3d-image';
  }

  scene.geometries.push({
    depth: 0.5,
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
    name: objId,
    receiveShadow: true,
    type: 'Mesh',
  });
}
