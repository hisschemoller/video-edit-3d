import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { getDefaultScene, getMatrix, fps, } from './plstmichel-shared.js';

const scene = getDefaultScene([0, 180], 3, false);
const modelFile = 'plstmichel.glb';
export default scene;

{ // 30 SECONDS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.6, h: 0.9, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 0, 0, -30]},
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

{ // TEST
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 16, h: 9, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -2, 0, -45]},
    ],
    canvas: { offset: 0, scale: 512/16, size: 512 },
    vSc: 512/480,
    vt: [0, 30],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 270]},
      { t: 30 + actorStart, v: [ 0, 270]},
    ],
    vrid: '1585_preview',
  });
}
