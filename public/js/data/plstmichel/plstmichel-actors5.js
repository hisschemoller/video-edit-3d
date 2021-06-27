import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 5, east towards Rue de la Huchette.
 */

const scene = getDefaultScene([132, 178], 'actors5', true);
export default scene;

{ // MAN GRIJS PAK WACHTEND
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.5, h: 2.5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -25, 0, -22]},
      { t: 10 + actorStart, v: [ -25, 0, -22]},
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [3, 13],
    vKeys: [
      { t:  0 + actorStart, v: [ 220, 170 ]},
      { t: 10 + actorStart, v: [ 220, 170 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // MENSEN WACHTEND VOOR STOPLICHT
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -15, 0, -20]},
      { t: 20 + actorStart, v: [ -15, 0, -20]},
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [0, 20],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 175 ]},
      { t: 20 + actorStart, v: [ 0, 175 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // TWEEE MEISJES PRATEND
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.8, h: 2.8, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -10, 0, -16]},
      { t: 20 + actorStart, v: [ -10, 0, -16]},
    ],
    canvas: { offset: 0, scale: 512/19, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [0, 20],
    vKeys: [
      { t:  0 + actorStart, v: [ 160, 185 ]},
      { t: 20 + actorStart, v: [ 160, 185 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // PLANTENBAK
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 6, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -6, 0, -6]},
      { t: 20 + actorStart, v: [ -6, 0, -6]},
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [0, 20],
    vKeys: [
      { t:  0 + actorStart, v: [ 370, 180 ]},
      { t: 20 + actorStart, v: [ 370, 180 ]},
    ],
    vrid: '1602_preview',
  });
}
