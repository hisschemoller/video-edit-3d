import { uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { Euler, LoopOnce, LoopRepeat, Quaternion } from '../lib/three/build/three.module.js';

let actorStart;

const scene = getDefaultScene([0, 90], 3, true);

// CLOUD 0
createCloud(19, {
  keys: [
    { time:  0, value: [0, 8, -60]},
    { time:  70, value: [8, 8, -60]},
  ],
  modelName: 'cloud0',
  imageFile: 'matthaikirchplatz/sky.png',
}, false);

// CLOUD 0a
createCloud(50, {
  keys: [
    { time:  0, value: [-4, 6.2, -6]},
    { time: 70, value: [ 8, 6.2, -6]},
  ],
  modelName: 'cloud0',
  imageFile: 'matthaikirchplatz/sky.png',
}, false);

// CLOUD 1
createCloud(100, {
  keys: [
    { time:  35, value: [-13.2, 5, -18]},
    { time: 145, value: [ 10.0, 5, -18]},
  ],
  modelName: 'cloud1',
  imageFile: 'matthaikirchplatz/sky.png',
});

// CLOUD 2
createCloud(120, {
  keys: [
    { time:   0, value: [-10, 5, -15]},
    { time: 200, value: [10, 5, -15]},
  ],
  modelName: 'cloud2',
  imageFile: 'matthaikirchplatz/sky.png',
});

// CLOUD 3
createCloud(80, {
  keys: [
    { time:   0, value: [ 4, 4, -10]},
    { time: 200, value: [10, 4, -10]},
  ],
  modelName: 'cloud3',
  imageFile: 'matthaikirchplatz/sky.png',
});

// CLOUD 4
createCloud(30, {
  keys: [
    { time:   0, value: [-4, 4, -20]},
    { time: 200, value: [10, 4, -20]},
  ],
  modelName: 'cloud4',
  imageFile: 'matthaikirchplatz/sky.png',
});

// CLOUD 5
createCloud(30, {
  keys: [
    { time:   0, value: [3, 3, -40]},
    { time: 200, value: [10, 3, -40]},
  ],
  modelName: 'cloud1',
  imageFile: 'matthaikirchplatz/sky.png',
});

/**
 * Create a cloud.
 * @param {Number} rotationDuration Rotation duration in seconds.
 * @param {Object} data External model data.
 * @param {Boolean} isForward Rotation direction.
 */
function createCloud(rotationDuration, data, isForward) {
  const id = uuidv4();
  data.id = id;
  data.modelFile = 'matthaikirchplatz.glb';

  // add the main animation (only if there are multiple keys)
  if (data.keys.length > 1) {
    scene.animations[0].tracks.push({
      name: `${id}.position`,
      type: 'vector3',
      keys: data.keys.map(key => ({ time: key.time * fps, value: [ ...key.value ]})),
    });
  }

  scene.external3DModels.push(data);
  scene.animations.push(createQuaternionAnimation(id, rotationDuration, isForward));
}

/**
 * Create quaternion rotation data for a cloud.
 * @param {String} id Mesh object ID.
 * @param {Number} duration Rotation duration in seconds.
 * @param {Boolean} isForward Rotation direction.
 * @returns {Object} Animation data.
 */
function createQuaternionAnimation(id, duration, isForward = true) {
  const startTime = 0;
  const endTime = (startTime + duration) * fps;
  const numSteps = 6;
  const totalAngle = Math.PI * 2 * (isForward ? 1 : -1);
  const keys = [];
  for (let i = 0; i <= numSteps; i++) {
    const normal = i / numSteps;
    const quaternion = new Quaternion().setFromEuler(new Euler(normal * totalAngle, 0, 0)).normalize();
    keys.push({
      time: startTime + (normal * (endTime - startTime)),
      value: [ quaternion.x, quaternion.y, quaternion.z, quaternion.w ],
    });
  }

  return {
    duration,
    fps,
    loop: LoopRepeat,
    name: `animation-${id}`,
    tracks: [
      {
        name: `${id}.quaternion`,
        type: 'quaternion',
        keys,
      }
    ],
  };
}

export default scene;
