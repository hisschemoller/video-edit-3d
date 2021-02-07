import { musicToTime, uuidv4, } from '../app/util.js';

/**
 * Add animating object to the scene.
 * @param {Object} scene
 * @param {Number} fps
 * @param {Object} config
 * @returns {String} Object ID, used as object name as well.
 */
export default function createActor(scene, fps = 30, config = {}) {
  const {

    // object position and animation
    rotate = [1,0,0,0 ,0,1,0,0 ,0,0,1,0],
    rotateY = 0,

    keys = [{t: 0, v: [0, 0, 0]}],

    // geometry
    // gw: geomWidth = 1, gh: geomHeight = 1, gd: geomDepth = 1,
    // path,

    // canvas
    canvas: {
      offset: canvasOffset = 256,
      scale: canvasScale = 256,
      size: canvasSize = 512,
    } = {},

    // geometry
    geom: {
      w: geomWidth = 1,
      h: geomHeight = 1,
      d: geomDepth = 1,
      path,
    } = {},

    // image
    // img: imageFileName, iOfX: imageOffsetX = 0, iOfY: imageOffsetY = 0, iSc: imageScale = 1,

    // image
    image: {
      file: imageFile = 'testimage3d.jpg',
      offx: imageOffsetX = 256,
      offy: imageOffsetY = 256,
      scale: imageScale = 1,
    } = {},

    // video
    vrid: videoResourceId,
    vSc: videoScale = 1,
    vKeys = [{t: 0, v: [0, 0], a: 0}],

    // videoTime, videoStartTimeInitial ???
    vt: videoTime = [0, null],
    vt0i: videoStartTimeInitial = config.vt ? config.vt[0] : 0,
    
  } = config;
  
  const objId = config.objId || uuidv4();
  const geomId = uuidv4();

  // points are custom path or else rectangle
  const points = path ? path : [ [0, 0], [geomWidth, 0], [geomWidth, geomHeight], [0, geomHeight] ];

  // add the animation (only if there are multiple keys)
  if (keys.length > 1) {
    scene.animations[0].tracks.push({
      name: `${objId}.position`,
      type: 'vector3',
      keys: keys.map(key => ({ time: key.t * fps, value: [ ...key.v ]})),
    });
  }

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
    scene.assets[videoId] = {
      end: videoTime[1],
      isLoop: true,
      keys: vKeys.map(key => ({ time: key.t, value: [ ...key.v ], acceleration: key.a ? key.a : 0 })),
      resourceId: videoResourceId,
      scale: videoScale,
      start: videoTime[0],
      startInitial: videoStartTimeInitial,
    };

    scene.canvases[canvasId].videoId = videoId;
  } else {
    const imageId = uuidv4();

    // add image
    scene.assets[imageId] = {
      file: imageFile,
      offsetX: imageOffsetX,
      offsetY: imageOffsetY,
      scale: imageScale,
    }

    scene.canvases[canvasId].imageId = imageId;
  }

  scene.geometries.push({
    depth: geomDepth,
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
    matrix: [ ...rotate , ...keys[0].v , 1 ],
    name: objId,
    receiveShadow: true,
    rotateY,
    type: 'Mesh',
    uuid: objId,
  });

  return objId;
}
