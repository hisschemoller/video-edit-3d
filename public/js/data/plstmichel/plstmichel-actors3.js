import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 3, west towards wall 1583, corner of the Seine.
 */

const scene = getDefaultScene([89, 120 ], 'actors3', true);
export default scene;

{ // STOPPENDE AUTO
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 7 },
    keys: [
      { t:  0 + actorStart, v: [  -30, 0, -27]},
      { t:  4 + actorStart, v: [  -30, 0, -2]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/320,
    vt: [21, 52],
    vKeys: [
      { t:  0 + actorStart, v: [ 480, 215], a: 0.9},
      { t:  4 + actorStart, v: [ 150, 215]},
    ],
    vrid: '1584_preview',
  });
}

{ // TWEE VROUWEN VAN RECHTS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 0.5, h: 3, d: 3 },
    keys: [
      { t:  0 + actorStart, v: [  -28, 0, -30]},
      { t:  27 + actorStart, v: [  -28, 0, 10]},
    ],
    matrix: getMatrix({ ry: Math.PI * 1, }).elements,
    canvas: { offset: 100, scale: 512/15, size: 512 },
    vSc: 512/250,
    vt: [3, 30],
    vKeys: [
      { t:  0 + actorStart, v: [ 480, 175]},
      { t:  27 + actorStart, v: [ -50, 175]},
    ],
    vrid: '1584_preview',
  });
}

{ // VROUW MET MOBIEL VAN LINKS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 0.5, h: 3, d: 3 },
    keys: [
      { t:  0 + actorStart, v: [  -17, 0, 16]},
      { t:  20 + actorStart, v: [  -17, 0, -9]},
    ],
    matrix: getMatrix({ ry: Math.PI * 1, }).elements,
    canvas: { offset: 100, scale: 512/15, size: 512 },
    vSc: 512/250,
    vt: [15, 35],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 175]},
      { t:  20 + actorStart, v: [ 480, 175]},
    ],
    vrid: '1584_preview',
  });
}

{ // STOPPENDE VRACHTWAGEN
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1, h: 5, d: 11 },
    keys: [
      { t:  0 + actorStart, v: [  -33, 0, 12]},
      // { t:  4 + actorStart, v: [  -32, 0, -5]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/16, size: 512 },
    vSc: 512/400,
    vt: [54, 85],
    vKeys: [
      { t:  0 + actorStart, v: [ 100, 200]},
      // { t:  4 + actorStart, v: [ 150, 205]},
    ],
    vrid: '1584_preview',
  });
}
