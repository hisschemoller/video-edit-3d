import { uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { Euler, LoopOnce, LoopRepeat, Quaternion } from '../lib/three/build/three.module.js';

const scene = getDefaultScene([ 0 /* 35 */, 600], 5, true);

export default scene;

// CYLINDER
createCylinder({x1: -9.0, x2: 11, y: 4, z: -5, time1: 0, time2: 30, 
  rotateDuration: 2});
createCylinder({x1: -11.0, x2: 13, y: 1, z: -15, time1: 2, time2: 32, 
  rotateDuration: 0.8});
createCylinder({x1: -10, x2: 10, y: 0.2, z: 0, time1: 10, time2: 20, 
  rotateDuration: 4});

/**
 * Create an animating cylinder.
 *
 * @param {Object} conf Configuration data.
 */
function createCylinder(conf) {
  const { x1, x2, y, z, time1, time2, rotateDuration } = conf;
  const id = uuidv4();
  const data = {
    id,
    imageFile: 'matthaikirchplatz/crowface1.jpg',
    keys: [
      { time: time1, value: [x1, y, z]},
      { time: time2, value: [x2, y, z]},
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
  
  const rotateKeys = [];
  const angles = [-0.75, 0.75, -0.77];
  for (let i = 0, n = angles.length; i < n; i++) {
    const normal = i / (n - 1);
    const angle = angles[i] * Math.PI;
    const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
    rotateKeys.push({
      time: normal * rotateDuration * fps,
      value: [ quaternion.x, quaternion.y, quaternion.z, quaternion.w ],
    });
  }
  const animationClip = {
    duration: rotateDuration,
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
  
}
