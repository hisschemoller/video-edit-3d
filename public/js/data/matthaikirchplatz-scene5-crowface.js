import { getTweenValues, uuidv4, } from '../app/util.js';
import { addLady, getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { 
  AdditiveAnimationBlendMode, 
  Euler, 
  InterpolateSmooth, 
  Matrix4, 
  LoopOnce, 
  LoopRepeat, 
  Quaternion,
  Vector3,
} from '../lib/three/build/three.module.js';

const scene = getDefaultScene([ 0 /* 80 */, 600], 5, true);

export default scene;


{ // CYLINDER 0
  const { id } = createExternalModel({x1: -9.0, x2: 11, y: 4, z: -5, time1: 0, time2: 30, modelName: 'cylinder'});
  addLeftRightAnimation(id, 2);
}
{ // CYLINDER 1
  const { id } = createExternalModel({x1: -11.0, x2: 13, y: 1, z: -15, time1: 2, time2: 32, modelName: 'cylinder'});
  addLeftRightAnimation(id, 0.8);
}
{ // CYLINDER 2
  const { id } = createExternalModel({x1: -10, x2: 10, y: 0.2, z: 0, time1: 12, time2: 21, modelName: 'cylinder'});
  addLeftRightAnimation(id, 4);
}
{ // SPHERE
  const { id } = createExternalModel({x1: -9.0, x2: 11, y: 3, z: -6, time1: 5, time2: 33, modelName: 'sphereBeak'});
  addLeftRightAnimation(id, 3);
  addUpDownAnimation(id, 4, 0.5);
}
{ // SNAVEL
  const { uuid: beakId } = createGroup({ x1: -5.5, x2: 5, y: 1.5, z: 2, time1: 9, time2: 31 });
  const beakData = scene.object.children.find(child => child.uuid === beakId);
  const { id: beakTopId, matrix: matrixTop } = createExternalModel({ x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakFirst', parentObj: beakData, });
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel({ x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakFirst', parentObj: beakData, rx: Math.PI, });
  addLeftRightAnimation(beakId, 2);
  addUpDownAnimation(beakId, 5, 0.5);
  addBeakOpenCloseAnimationClip(beakId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.9);
}
{ // SNAVEL DUN
  const { uuid: beakId } = createGroup({ x1: -13, x2: 15, y: 6, z: -20, time1: 15, time2: 24 });
  const beakData = scene.object.children.find(child => child.uuid === beakId);
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel({ x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakThin', parentObj: beakData, });
  const { id: beakTopId, matrix: matrixTop } = createExternalModel({ x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakThin', parentObj: beakData, rx: Math.PI, });
  addLeftRightAnimation(beakId, 3);
  addBeakOpenCloseAnimationClip(beakId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.6);
}
{
  const x1 = -8, x2 = 8, z = -4, t1 = 18;
  // VROUW ZONDER HOOFD
  {
    const y = -0.5, h = 1.6, vy = 73;
    addLady( scene, t1, x1, x2, y, z, h, vy);
  }
  { // SNAVEL MET KOP
    const { id: headId } = createExternalModel({ x1: x1 + 0.6, x2: x2 + 0.6, y: 1.6, z: z - 0.5, time1: t1, time2: t1 + 17,
      modelName: 'sphereIco' });
    const headData = scene.object.children.find(child => child.id === headId);
    const { id: beakBtmId, matrix: matrixBtm } = createExternalModel({ x1: 0.2, y: 0, z: 0, time1: 0,  
      modelName: 'beakTriangle', parentObj: headData, });
    const { id: beakTopId, matrix: matrixTop } = createExternalModel({ x1: 0.2, y: 0, z: 0, time1: 0,  
      modelName: 'beakTriangle', parentObj: headData, rx: Math.PI, });
    addLeftRightAnimation(headId, 3);
    addBeakOpenCloseAnimationClip(headId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.6);
  }
}
{ // VOGELKOP OP STOK
  const x1 = -5, x2 = 5, z = -14, t1 = 0;
  const { id: headId } = createExternalModel({ x1: x1 + 0.6, x2: x2 + 0.6, y: 4.6, z: z - 0.5, time1: t1, time2: t1 + 17,
    modelName: 'sphereIco' });
  const headData = scene.object.children.find(child => child.id === headId);
  createExternalModel({ x1: 0, y: 0, z: 0, time1: 0, modelName: 'stick', parentObj: headData, });
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel({ x1: 0.2, y: 0, z: 0, time1: 0,  
    modelName: 'beakTriangle', parentObj: headData, });
  const { id: beakTopId, matrix: matrixTop } = createExternalModel({ x1: 0.2, y: 0, z: 0, time1: 0,  
    modelName: 'beakTriangle', parentObj: headData, rx: Math.PI, });
  addLeftRightAnimation(headId, 3);
  addUpDownAnimation(headId, 5, 0.8);
  addBeakOpenCloseAnimationClip(headId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.4);
}



function addBeakOpenCloseAnimationClip(beakId, topId, btmId, matrixTop, matrixBtm, duration) {
  const animationClip = {
    duration,
    fps,
    loop: LoopRepeat,
    name: `animation-beak-${beakId}`,
    tracks: [],
  };
  scene.animations.push(animationClip);
  animationClip.tracks.push(addBeakOpenCloseAnimationTrack(topId, matrixTop, duration));
  animationClip.tracks.push(addBeakOpenCloseAnimationTrack(btmId, matrixBtm, duration));
}

function addBeakOpenCloseAnimationTrack(id, matrix, duration) {
  const angles = [0, -0.2, 0, 0];
  const keys = [];
  const matrix4 = new Matrix4().fromArray(matrix);
  const beakQuaternion = new Quaternion().setFromRotationMatrix(matrix4);
  // angles[1] *= -1;
  for (let i = 0, n = angles.length; i < n; i++) {
    const normal = i / (n - 1);
    const angle = angles[i] * Math.PI;
    const angleQuaternion = new Quaternion().setFromEuler(new Euler(0, 0, angle)).normalize();
    const quaternion = beakQuaternion.clone().multiply(angleQuaternion);
    keys.push({
      time: normal * duration * fps,
      value: [ quaternion.x, quaternion.y, quaternion.z, quaternion.w ],
    });
  }
  return {
    name: `${id}.quaternion`,
    keys,
    type: 'quaternion',
  };
}

/**
 *
 *
 * @param {*} id
 * @param {*} duration
 */
function addLeftRightAnimation(id, duration) {
  const keys = [];
  const angles = [1.75, -1.75, 1.745];
  for (let i = 0, n = angles.length; i < n; i++) {
    const normal = i / (n - 1);
    const angle = angles[i] * Math.PI;
    const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
    keys.push({
      time: normal * duration * fps,
      value: [ quaternion.x, quaternion.y, quaternion.z, quaternion.w ],
    });
  }
  const animationClip = {
    duration,
    fps,
    loop: LoopRepeat,
    name: `animation-${id}`,
    tracks: [
      {
        name: `${id}.quaternion`,
        keys,
        type: 'quaternion',
      }
    ],
  };
  scene.animations.push(animationClip);
}

/**
 *
 *
 * @param {*} id
 * @param {*} duration
 * @param {*} amplitude
 */
function addUpDownAnimation(id, duration, amplitude) {
  const numTweenSteps = 6;
  const amplitudes = [amplitude, -amplitude, amplitude];
  const keys = [];
  for (let i = 0, n = amplitudes.length - 1; i < n; i++) {
    const tweenValues = getTweenValues(amplitudes[i], amplitudes[i + 1], numTweenSteps, 'easeInOut');
    for (let j = 0, m = tweenValues.length; j < m; j++) {
      const normal = (i / n) + ((j / m) / n);
      keys.push({ time: normal * duration * fps, value: [0, tweenValues[j], 0] });
    }
    // const normal = i / (n - 1);
    // moveKeys.push({ time: normal * duration * fps, value: [0, amplitudes[i], 0] });
  }
  const animationClip = {
    blendMode: AdditiveAnimationBlendMode,
    duration,
    fps,
    interpolation: InterpolateSmooth,
    loop: LoopRepeat,
    name: `animation-pos-${id}`,
    tracks: [
      {
        name: `${id}.position`,
        keys,
        type: 'vector3',
      }
    ],
  };
  scene.animations.push(animationClip);
}

/**
 * Create a mesh from an external model.
 * @param {Object} conf Configuration data.
 * @returns {Object} Data.
 */
function createExternalModel(conf) {
  const { parentObj = scene.object, x1, x2, y, z, time1, time2, modelName, 
    sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0, 
  } = conf;
  const id = uuidv4();

  // apply position, scale and rotation, if any
  const scaleMatrix = new Matrix4().makeScale(sx, sy, sz);
  const rotationMatrix = new Matrix4().makeRotationFromEuler(new Euler(rx, ry, rz));
  const matrix4 = new Matrix4().multiplyMatrices(scaleMatrix, rotationMatrix);
  matrix4.setPosition(x1, y, z);

  const data = {
    children: [],
    id,
    imageFile: 'matthaikirchplatz/crowface1.jpg',
    matrix: matrix4.elements,
    modelFile: 'matthaikirchplatz.glb',
    modelName,
  }
  parentObj.children.push(data);
  
  // add the main animation (only if there are multiple positions)
  if (x2 && x2 !== x1) {
    scene.animations[0].tracks.push({
      name: `${id}.position`,
      type: 'vector3',
      keys: [
        { time: time1 * fps, value: [x1, y, z]},
        { time: time2 * fps, value: [x2, y, z]}
      ],
    });
  }

  return data;
}

/**
 * Create an empty Group.
 * @param {Object} conf Configuration data.
 * @returns {Object} Data.
 */
function createGroup(conf) {
  const { parentObj = scene.object, x1, x2, y, z, time1, time2 } = conf;
  const id = uuidv4();
  const data = {
    children: [],
    matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, x1, y, z ,1],
    name: id,
    type: 'Group',
    uuid: id,
  }
  parentObj.children.push(data);
  
  // add the main animation (only if there are multiple keys)
  if (x2 && time2) {
    scene.animations[0].tracks.push({
      name: `${id}.position`,
      type: 'vector3',
      keys: [
        { time: time1 * fps, value: [ x1, y, z ] },
        { time: time2 * fps, value: [ x2, y, z ] },
      ],
    });
  }
  return data;
}
