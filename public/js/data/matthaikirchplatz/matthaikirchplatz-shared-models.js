import { fps, } from './matthaikirchplatz-shared.js';
import { getTweenValues, uuidv4, } from '../../app/util.js';
import { 
  AdditiveAnimationBlendMode, 
  Euler, 
  InterpolateSmooth, 
  Matrix4, 
  LoopOnce, 
  LoopRepeat, 
  Quaternion,
  Vector3,
} from '../../lib/three/build/three.module.js';

export function addBeakOpenCloseAnimationClip(scene, beakId, topId, btmId, matrixTop, matrixBtm, duration) {
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

export function addLeftRightAnimation(scene, id, duration, angle = 1.75, baseAngle = 0, rotate = 0) {
  let angles;
  switch (rotate) {
    case 1:
      baseAngle = 0;
      angles = [0, 0.5, 1, -0.5, 0];
      break;
    case -1:
      baseAngle = 0;
      angles = [0, -0.5, 1, 0.5, 0];
      break;
    default:
      angles = [angle, -angle, angle];
      break;
  }
  const keys = [];
  for (let i = 0, n = angles.length; i < n; i++) {
    const normal = i / (n - 1);
    const angle = (baseAngle + angles[i]) * Math.PI;
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

export function addUpDownAnimation(scene, id, duration, amplitude) {
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

export function createExternalModel(scene, conf) {
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

export function createGroup(scene, conf) {
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