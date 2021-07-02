import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 6, passing Notre Dame.
 */

const scene = getDefaultScene([168, 215.16], 'actors6', true);
export default scene;

{ // MAN STAAT STIL
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.6, h: 3.2, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 48, 0, -3]},
      { t: 25 + actorStart, v: [ 48, 0, -3]},
    ],
    canvas: { offset: 0, scale: 512/31, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [116, 143],
    vKeys: [
      { t:  0 + actorStart, v: [ 290, 180 ]},
      { t: 25 + actorStart, v: [ 290, 180 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // JONGETJE
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.5, h: 2.5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 45, 0, -13]},
      { t: 30 + actorStart, v: [ 45, 0, -13]},
    ],
    canvas: { offset: 0, scale: 512/13, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [265, 322],
    vKeys: [
      { t:  0 + actorStart, v: [ 140, 228 ]},
      { t: 30 + actorStart, v: [ 140, 228 ]},
    ],
    vrid: '1600_preview',
  });
}

{ // MAN MET PET EN TAS NAAR RECHTS
  const actorStart = 3;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 46, -3.5, -25]},
      { t:  0.0001 + actorStart, v: [ 46, 0, -25]},
      { t: 10 + actorStart, v: [ 46, 0, -5]},
    ],
    canvas: { offset: 0, scale: 512/38, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [86, 96],
    vKeys: [
      { t:  0 + actorStart, v: [ 135, 170 ]},
      { t: 10 + actorStart, v: [ 320, 170 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // VROUW LICHTE JAS NAAR RECHTS
  const actorStart = 9;
  createActor(scene, fps, {
    geom: { w: 1.6, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 45, -3.5, -30]},
      { t:  0.0001 + actorStart, v: [ 45, 0, -30]},
      { t: 10 + actorStart, v: [ 45, 0, -10]},
    ],
    canvas: { offset: 50, scale: 512/38, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [106, 116],
    vKeys: [
      { t:  0 + actorStart, v: [ 55, 170 ]},
      { t: 10 + actorStart, v: [ 270, 170 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // TWEE VROUWEN MET ROLKOFFERS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 47, 0, -28]},
      { t: 20 + actorStart, v: [ 47, 0, -28]},
    ],
    canvas: { offset: 50, scale: 512/38 , size: 512 },
    rotateY: Math.PI * -0.2,
    vSc: 512/480,
    vt: [107, 137],
    vKeys: [
      { t:  0 + actorStart, v: [ 190, 170 ]},
      { t: 20 + actorStart, v: [ 190, 170 ]},
    ],
    vrid: '1582_preview',
  });
}