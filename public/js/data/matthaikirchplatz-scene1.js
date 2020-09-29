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

export default scene;
