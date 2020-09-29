import { musicToTime, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../app/actor.js';

let actorStart;

const scene = getDefaultScene([0, 15], 3, true);

// DAME
actorStart = 4;
createActor(scene, fps, {
  gw: 2.0, gh: 2.3,
  keys: [
    { t:  0 + actorStart, v: [ -10.7, -0.5, -11]},
    { t: 17 + actorStart, v: [  11, -0.5, -11]},
  ],
  cSz: 512, cSc: 512/2.5, cOf: 0,
  vSc: 512/76, 
  vt: [0, 15],
  vKeys: [
    { t:  0 + actorStart, v: [ -90, 73]},
    { t: 15 + actorStart, v: [480, 73]},
  ],
  vrid: 'mkp_dame_preview',
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