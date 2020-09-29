import { musicToTime, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../app/actor.js';

const scene = getDefaultScene([0, 180], 1, false);

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-8, -0.51, 0]}],
  gw: 16, gh: 0.01, gd: 12,
  cSz: 1024, cSc: 1024/16, cOf: 0,
  img: 'mkp-ground.jpg', // 'testimage3d.jpg',
  iOfX: 0, iOfY: 880, iSc: 1,
});

// GROUND FAR
createActor(scene, fps, {
  keys: [{t: 0, v: [-12, -0.52, -12]}],
  gw: 24, gh: 0.01, gd: 12,
  cSz: 1024, cSc: 1024 / 24, cOf: 0,
  img: 'mkp-ground.jpg',
  iOfX: 0, iOfY: 512, iSc: 1,
});

// TESTIMAGE3D
// createActor(scene, fps, {
//   keys: [{t: 0, v: [-2, 0, -2]}],
//   cSz: 1024, cSc: 1024, cOf: 0,
//   img: 'testimage3d.jpg',
//   iOfX: 0, iOfY: 1024, iSc: 1,
// });

// CUBE
// createActor(scene, fps, {
//   img: 'testimage3d.jpg',
// });

// 30 SECONDS
// createActor(scene, fps, {
//   keys: [
//     { t: 0, v: [-1, 0, 0] },
//     // { t: 4, v: [ 1, 0, 0] },
//   ],
//   vKeys: [
//     { t: 0, v: [        0, 360] },
//     { t: 4, v: [640 - 360, 360] },
//   ],
//   vSc: 256 / 360,
//   vt: [0, 30],
//   vrid: '30seconds',
// });

// VIDEOTEST
// createActor(scene, fps, {
//   keys: [{t: 0, v: [2, 0, -2]}],
//   gw: 16 / 9, gh: 1, gd: 1,
//   cSz: 512, cSc: 256, cOf: 0,
//   vrid: '30seconds',
//   vSc: 256 / 360,
//   vKeys: [{t: 0, v: [0, 360]}],
//   vt: [0, 30],
// });

export default scene;
