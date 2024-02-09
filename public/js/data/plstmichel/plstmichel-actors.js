import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { getDefaultScene, getMatrix, fps, } from './plstmichel-shared.js';

/**
 * Dit bestand wordt niet gebruikt, zie ./plstmichel.js
 */

const scene = getDefaultScene([0, 180], 3, true);
const modelFile = 'plstmichel.glb';
export default scene;

{ // 30 SECONDS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.6, h: 0.9, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 0, 0, -25]},
    ],
    canvas: { offset: 0, scale: 512/1.6, size: 512 },
    vSc: 512/640,
    vt: [0, 30],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 360]},
      { t: 30 + actorStart, v: [ 0, 360]},
    ],
    vrid: '30seconds',
  });
}

{ // MAN MET ROL
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.7, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  7, 0, -17]},
      { t:  8 + actorStart, v: [ -8, 0, -17]},
    ],
    canvas: { offset: 0, scale: 512/8, size: 512 },
    vSc: 512/480,
    vt: [42, 50],
    vKeys: [
      { t:  0 + actorStart, v: [ 550, 270]},
      { t:  8 + actorStart, v: [ -200, 270]},
    ],
    vrid: '1585_preview',
  });
}
