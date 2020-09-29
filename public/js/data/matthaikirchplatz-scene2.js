import { musicToTime, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../app/actor.js';

let actorStart;

const scene = getDefaultScene([0, 25], 2, true);

// DAME
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
  vrid: 'mkp_dame_preview',
});

export default scene;
