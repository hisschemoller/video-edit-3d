import { musicToTime, uuidv4, } from '../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../app/actor.js';

let actorStart;

const scene = getDefaultScene([35, 95], 3, true);

addLady(0, -10.7, 11, -0.5, -11);
addLady(3, -9.0,  10, -0.5,  -8);
addLady(6, -14.0, 20, -0.8, -20);
addLady(8, -11, 11.8, -0.6, -13);
addLady(9,  -8,    8, -0.5,  -5);


function addLady(actorStart, x0, x1, y, z) {
  createActor(scene, fps, {
    gw: 1.3, gh: 2.3,
    keys: [
      { t:  0 + actorStart, v: [ x0, y, z]},
      { t: 17 + actorStart, v: [ x1, y, z]},
    ],
    cSz: 512, cSc: 512/2.5, cOf: 0,
    vSc: 512/76, 
    vt: [0, 60],
    vKeys: [
      { t:  0 + actorStart, v: [ -90 + 25, 73]},
      { t: 15 + actorStart, v: [ 480 + 25, 73]},
    ],
    vrid: 'mkp_woman_preview',
  });
}

export default scene;
