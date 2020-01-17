import { musicToTime, uuidv4, } from '../app/util.js';

/**
 * Add animating object to the scene.
 * @param {Object} scene
 * @param {Object} config 
 */
export default function createActor(scene, config) {
  const {
    x0: fromX = -2,
    x1: toX = 2.5,
    z = -2,
    t0: startTime = 0,
    t1: endTime = 150,
    gw: geomWidth = 1,
    gh: geomHeight = 1.5,
    cSz: canvasSize = 512, cSc: canvasScale = 256, cOf: canvasOffset = 128,
    vt0: videoStartTime = 0, vt1: videoEndTime = 100, vSc: videoScale = 1, 
    vOx: videoOffsetX = 0, vOy: videoOffsetY = 0, vOx2: videoOffsetX2 = 0, 
    path,
    videoResourceId,
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
      offsetX: videoOffsetX,
      offsetY: videoOffsetY,
      offsetX2: videoOffsetX2,
      resourceId: videoResourceId,
      scale: videoScale,
      start: videoStartTime,
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