import { uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { Euler, LoopOnce, LoopRepeat, Quaternion } from '../lib/three/build/three.module.js';

const scene = getDefaultScene([ 0 /* 35 */, 600], 5, true);

export default scene;

// CYLINDER
const id = uuidv4();
const data = {
  id,
  imageFile: 'testimage3d.jpg',
  keys: [
    { time:   0, value: [-9.5, 4, -5]},
    { time:  30, value: [11, 4, -5]},
  ],
  modelFile: 'matthaikirchplatz.glb',
  modelName: 'cylinder',
}
scene.external3DModels.push(data);

// add the main animation (only if there are multiple keys)
if (data.keys.length > 1) {
  scene.animations[0].tracks.push({
    name: `${id}.position`,
    type: 'vector3',
    keys: data.keys.map(key => ({ time: key.time * fps, value: [ ...key.value ]})),
  });
}

const duration = 2;
const startTime = 0;
const endTime = (startTime + duration) * fps;
const rotateKeys = [];
const angles = [-0.75, 0.75, -0.77];
for (let i = 0, n = angles.length; i < n; i++) {
  const normal = i / (n - 1);
  const angle = angles[i] * Math.PI;
  const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
  rotateKeys.push({
    time: startTime + (normal * (endTime - startTime)),
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
      keys: rotateKeys,
      type: 'quaternion',
    }
  ],
};
scene.animations.push(animationClip);
