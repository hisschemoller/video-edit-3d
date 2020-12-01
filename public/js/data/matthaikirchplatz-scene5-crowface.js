import { getTweenValues, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { AdditiveAnimationBlendMode, Euler, InterpolateSmooth, LoopOnce, LoopRepeat, Quaternion } from '../lib/three/build/three.module.js';

const scene = getDefaultScene([ 0 /* 35 */, 600], 5, true);

export default scene;

let positions;

// CYLINDER
const { id: cyl1Id } = createExternalModel({ parentObj: scene.object, x1: -10, x2: 10, y: 4, z: -5, time1: 0, time2: 30, 
  modelName: 'cylinder' });
addLeftRightAnimation(cyl1Id, 2);
addUpDownAnimation(cyl1Id, 3, 0.5);

// const { id: cyl2Id } = createExternalModel({ x1: 0, x2: 10, y: -3, z: 5, time1: 0, time2: 30, 
//   modelName: 'sphere',
//   parentObj: scene.object.children.find(child => child.id === cyl1Id)
// });

// SNAVEL
// data = createGroup({ x1: -2.0, x2: 2, y: 4, z: -5, time1: 0, time2: 30 });

/**
 *
 *
 * @param {*} id
 * @param {*} duration
 */
function addLeftRightAnimation(id, duration) {
  const keys = [];
  const angles = [-0.75, 0.75, -0.745];
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
  const { parentObj, x1, x2, y, z, time1, time2, modelName } = conf;
  const id = uuidv4();
  const data = {
    children: [],
    id,
    imageFile: 'matthaikirchplatz/crowface1.jpg',
    keys: [
      { time: time1, value: [x1, y, z]},
      { time: time2, value: [x2, y, z]},
    ],
    modelFile: 'matthaikirchplatz.glb',
    modelName,
  }
  parentObj.children.push(data);
  
  // add the main animation (only if there are multiple keys)
  if (data.keys.length > 1) {
    scene.animations[0].tracks.push({
      name: `${id}.position`,
      type: 'vector3',
      keys: data.keys.map(key => ({ time: key.time * fps, value: [ ...key.value ]})),
    });
  }
  return data;
}

// createFlyingObject({x1: -9.0, x2: 11, y: 4, z: -5, time1: 0, time2: 30, 
//   rotateDuration: 2, modelName: 'cylinder'});
// createFlyingObject({x1: -11.0, x2: 13, y: 1, z: -15, time1: 2, time2: 32, 
//   rotateDuration: 0.8, modelName: 'cylinder'});
// createFlyingObject({x1: -10, x2: 10, y: 0.2, z: 0, time1: 10, time2: 20, 
//   rotateDuration: 4, modelName: 'cylinder'});
// createFlyingObject({x1: -9.0, x2: 11, y: 3, z: -6, time1: 7, time2: 35, 
//   rotateDuration: 3, modelName: 'sphere', zMove: 0.5});

// // SNAVEL
// createFlyingObject({x1: -7.0, x2: 11, y: 3, z: -3, time1: 0, time2: 20, 
//   rotateDuration: 2, type: 'Group'});
