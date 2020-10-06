import { musicToTime, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../app/actor.js';
import { Euler, LoopOnce, LoopRepeat, Quaternion, QuaternionKeyframeTrack, Vector3, VectorKeyframeTrack } from '../lib/three/build/three.module.js';

let actorStart;

const scene = getDefaultScene([0, 40], 2, true);

// WOMAN PREVIEW
actorStart = 5;
createActor(scene, fps, {
  gw: 2.0, gh: 2.3,
  keys: [
    { t:  0 + actorStart, v: [ -10.7, -0.5, -10]},
    { t: 17 + actorStart, v: [  11, -0.5, -10]},
  ],
  cSz: 512, cSc: 512/2.5, cOf: 0,
  vSc: 512/76, 
  vt: [0, 15],
  vKeys: [
    { t:  0 + actorStart, v: [ -80, 73]},
    { t: 15 + actorStart, v: [ 480, 73]},
  ],
  vrid: 'mkp_woman_preview',
});

// COUPLE
// actorStart = 22;
// createActor(scene, fps, {
//   gw: 2, gh: 2.5,
//   keys: [
//     { t:  0 + actorStart, v: [ -9.4, -0.5, -3]},
//     { t: 11 + actorStart, v: [   8.6, -0.5, -3]},
//   ],
//   cSz: 512, cSc: 512/2.5, cOf: 0,
//   vSc: 512/134, 
//   vt: [0, 11],
//   vKeys: [
//     { t:  0 + actorStart, v: [-160, 134]},
//     { t: 11 + actorStart, v: [ 610, 134]},
//   ],
//   vrid: 'mkp_couple_preview',
// });

// MEN
// actorStart = 30;
// createActor(scene, fps, {
//   gw: 2.5, gh: 2.5,
//   keys: [
//     { t:  0 + actorStart, v: [ -11, -0.5, -2]},
//     { t: 11 + actorStart, v: [  8, -0.5, -2]},
//   ],
//   cSz: 512, cSc: 512/2.5, cOf: 0,
//   vSc: 512/108, 
//   vt: [0, 14],
//   vKeys: [
//     { t:  0 + actorStart, v: [-190, 108]},
//     { t: 14 + actorStart, v: [ 620, 108]},
//   ],
//   vrid: 'mkp_men_preview',
// });

// MAN
actorStart = 0;
createActor(scene, fps, {
  gw: 1.5, gh: 2,
  keys: [
    { t:  0 + actorStart, v: [ -12, -0.5, -15]},
    { t: 24 + actorStart, v: [  12, -0.5, -15]},
  ],
  cSz: 512, cSc: 512/2.5, cOf: 0,
  vSc: 512/78,
  vt: [0, 24],
  vKeys: [
    { t:  0 + actorStart, v: [ -60, 70], a: 0.55, },
    { t: 24 + actorStart, v: [ 490, 70]},
  ],
  vrid: 'mkp_man_preview',
});

// CLOUD 0
const id = 'testcloud'; // uuidv4();
const cloudData = {
  id,
  keys: [
    { time:  0, value: [-6, 4, -10]},
    { time:  60, value: [8, 4, -10]},
  ],
  modelFile: 'matthaikirchplatz9.glb',
  modelName: 'cloud0',
  imageFile: 'matthaikirchplatz/sky.png',
};
scene.external3DModels.push(cloudData);

 // add the main animation (only if there are multiple keys)
 if (cloudData.keys.length > 1) {
  scene.animations[0].tracks.push({
    name: `${id}.position`,
    type: 'vector3',
    keys: cloudData.keys.map(key => ({ time: key.time * fps, value: [ ...key.value ]})),
  });
}

const startTime = 0;
const endTime = 16 * fps;
const numSteps = 6;
const totalAngle = Math.PI * 2;
let keys = [];
for (let i = 0; i <= numSteps; i++) {
  const normal = i / numSteps;
  const quaternion = new Quaternion().setFromEuler(new Euler(normal * totalAngle, 0, 0)).normalize();
  keys.push({
    time: startTime + (normal * (endTime - startTime)),
    value: [ quaternion.x, quaternion.y, quaternion.z, quaternion.w ],
  });
}

scene.animations.push({
  duration: 16,
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
});

  // scene.animations[0].tracks.push({
  //   name: `${id}.position`,
  //   type: 'vector3',
  //   keys: cloudData.keys.map(key => ({ time: key.time * fps, value: [ ...key.value ]})),
  // });
// }

export default scene;
