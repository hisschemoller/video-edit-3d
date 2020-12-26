import { musicToTime, uuidv4, } from '../../app/util.js';
import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../../app/actor.js';

let actorStart;

const scene = getDefaultScene([ 35 /* 35 */, 95], 3, true);

addLady( 0.0, -10.7, 11.0, -0.5, -11.0);
addLady( 3.0,  -9.0, 10.0, -0.5,  -8.0);
addLady( 6.0, -14.0, 20.0, -0.8, -20.0);
addLady( 8.0, -11.0, 11.8, -0.6, -13.0);
addLady( 9.2,  -8.0,  8.6, -0.5,  -5.0);
addLady(10.0, -10.7, 11.0, -0.5, -11.0);
addLady(11.0, -12.0, 12.8, -0.6, -15.0);
addLady(11.5, -11.0, 11.8, -0.6, -13.0);
addLady(13.0,  -7.0,  7.5, -0.5,  -2.0);
addLady(15.0, -16.0, 25.0, -0.9, -25.0);
addLady(15.5, -10.7, 11.0, -0.5, -11.0);
addLady(17.0,  -6.5,  6.5, -0.2,   2.0);


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
