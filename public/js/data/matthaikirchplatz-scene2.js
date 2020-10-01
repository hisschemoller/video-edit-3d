import { musicToTime, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../app/actor.js';

let actorStart;

const scene = getDefaultScene([0, 40], 2, true);

// WOMAN
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
    { t:  0 + actorStart, v: [ -90, 73]},
    { t: 15 + actorStart, v: [480, 73]},
  ],
  vrid: 'mkp_woman_preview',
});

// COUPLE
actorStart = 22;
createActor(scene, fps, {
  gw: 2, gh: 2.5,
  keys: [
    { t:  0 + actorStart, v: [ -9.4, -0.5, -3]},
    { t: 11 + actorStart, v: [   8.6, -0.5, -3]},
  ],
  cSz: 512, cSc: 512/2.5, cOf: 0,
  vSc: 512/134, 
  vt: [0, 11],
  vKeys: [
    { t:  0 + actorStart, v: [-160, 134]},
    { t: 11 + actorStart, v: [ 610, 134]},
  ],
  vrid: 'mkp_couple_preview',
});

// MEN
actorStart = 30;
createActor(scene, fps, {
  gw: 2.5, gh: 2.5,
  keys: [
    { t:  0 + actorStart, v: [ -11, -0.5, -2]},
    { t: 11 + actorStart, v: [  8, -0.5, -2]},
  ],
  cSz: 512, cSc: 512/2.5, cOf: 0,
  vSc: 512/108, 
  vt: [0, 14],
  vKeys: [
    { t:  0 + actorStart, v: [-190, 108]},
    { t: 14 + actorStart, v: [ 620, 108]},
  ],
  vrid: 'mkp_men_preview',
});

// MAN
actorStart = 0;
createActor(scene, fps, {
  gw: 1.5, gh: 2.5,
  keys: [
    { t:  0 + actorStart, v: [ -1, -0.5, -8]},
    { t: 24 + actorStart, v: [  1, -0.5, -8]},
  ],
  cSz: 512, cSc: 512/2.5, cOf: 0,
  vSc: 512/78,
  vt: [0, 24],
  vKeys: [
    { t:  0 + actorStart, v: [ -75, 78]},
    { t: 24 + actorStart, v: [ 580, 78]},
  ],
  vrid: 'mkp_man_preview',
});

export default scene;