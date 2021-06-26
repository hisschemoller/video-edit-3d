import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 4, west, turn around to east, Rue de la Huchette.
 */

const scene = getDefaultScene([115, 140 ], 'actors4', true);
export default scene;

{ // FIETSER NADERBIJ
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 3 },
    keys: [
      { t:  0 + actorStart, v: [  -50, 0, 0]},
      { t:  10 + actorStart, v: [  -42, 0, 0]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/320,
    vt: [17, 27],
    vKeys: [
      { t:  0 + actorStart, v: [ 60, 190]},
      { t:  10 + actorStart, v: [ 60, 190]},
    ],
    vrid: '1583_preview',
  });
}

{ // MAN STILSTAAND
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 3 },
    keys: [
      { t:  0 + actorStart, v: [  -48, 0, 3.5]},
      { t:  10 + actorStart, v: [  -48, 0, 3.5]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/35, size: 512 },
    vSc: 512/320,
    vt: [20, 30],
    vKeys: [
      { t:  0 + actorStart, v: [ 178, 155]},
      { t:  10 + actorStart, v: [ 178, 155]},
    ],
    vrid: '1583_preview',
  });
}

{ // MAN LOPEND VAN RECHTS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.5, d: 2 },
    keys: [
      { t:  0 + actorStart, v: [ -35, 0, -11]},
      { t:  8 + actorStart, v: [ -38, 0, 3.5]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/7.7, size: 512 },
    vSc: 512/320,
    vt: [16, 24],
    vKeys: [
      { t:  0 + actorStart, v: [ 420, 215]},
      { t:  8 + actorStart, v: [ 0, 215]},
    ],
    vrid: '1583_preview',
  });
}

{ // MOEDER EN DOCHTER
  const actorStart = 5;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.7, d: 2 },
    keys: [
      { t:  0 + actorStart, v: [ -48, -3, -6]},
      { t:  0.0001 + actorStart, v: [ -48, 0, -6]},
      { t:  7 + actorStart, v: [ -48, 0, -6]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/6, size: 512 },
    vSc: 512/320,
    vt: [107, 114],
    vKeys: [
      { t:  0 + actorStart, v: [ 200, 270]},
      { t:  7 + actorStart, v: [ 200, 270]},
    ],
    vrid: '1583_preview',
  });
}

{ // TWEE MANNEN MET KOFFER VAN RECHTS
  const actorStart = 4;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.6, d: 2.8 },
    keys: [
      { t:  0 + actorStart, v: [ -36, 0, -12]},
      { t:  9 + actorStart, v: [ -46, 0, -5]},
    ],
    rotateY: Math.PI * -0.2,
    canvas: { offset: 100, scale: 512/7.5, size: 512 },
    vSc: 512/320,
    vt: [117.5, 127],
    vKeys: [
      { t:  0 + actorStart, v: [ 440, 220]},
      { t:  9 + actorStart, v: [ -100, 220]},
    ],
    vrid: '1583_preview',
  });
}

{ // MAN MET KAR VOL SPULLEN VAN LINKS
  const actorStart = 4;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.6, d: 3.2 },
    keys: [
      { t:  0.00001 + actorStart, v: [ -46, -3, -12]},
      { t:  0 + actorStart, v: [ -46, 0, -12]},
      { t:  30 + actorStart, v: [ -30, 0, -45]},
    ],
    rotateY: Math.PI * -0.4,
    canvas: { offset: 100, scale: 512/25, size: 512 },
    vSc: 512/320,
    vt: [45, 60],
    vKeys: [
      { t:  0 + actorStart, v: [ -15, 155]},
      { t:  30 + actorStart, v: [ 160, 155]},
    ],
    vrid: '1585_preview',
  });
}

{ // MAN LOPEND MET SCOOTER VAN LINKS
  const actorStart = 9;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.8, d: 3.2 },
    keys: [
      { t:  0.0001 + actorStart, v: [ -48, -3, -16]},
      { t:  0 + actorStart, v: [ -48, 0, -16]},
      { t:  6 + actorStart, v: [ -33, 0, -14]},
      { t:  6.0001 + actorStart, v: [ -33, -3, -14]},
    ],
    rotateY: Math.PI * -0.5,
    canvas: { offset: 100, scale: 512/5, size: 512 },
    vSc: 512/320,
    vt: [90, 96],
    vKeys: [
      { t:  0 + actorStart, v: [ -150, 270]},
      { t:  6 + actorStart, v: [ 300, 270]},
    ],
    vrid: '1585_preview',
  });
}

{ // FIETSER GEEL HESJE VAN LINKS
  const actorStart = 13;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.9, d: 3.2 },
    keys: [
      { t:  0 + actorStart, v: [ -54, 0, -16]},
      { t:  4 + actorStart, v: [ -25, 0, -22]},
      { t:  4.0001 + actorStart, v: [ -25, -3, -22]},
    ],
    rotateY: Math.PI * -0.4,
    canvas: { offset: 100, scale: 512/5, size: 512 },
    vSc: 512/320,
    vt: [36.5, 40.5],
    vKeys: [
      { t:  0 + actorStart, v: [ -200, 270]},
      { t:  4 + actorStart, v: [ 250, 270]},
    ],
    vrid: '1585_preview',
  });
}

{ // MAN MET KOKER VAN RECHTS
  const actorStart = 15;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.8, d: 2.4 },
    keys: [
      { t:  0 + actorStart, v: [ -26, 0, -20]},
      { t:  6 + actorStart, v: [ -36, 0, -26]},
    ],
    rotateY: Math.PI * 1.2,
    canvas: { offset: 100, scale: 512/5.5, size: 512 },
    vSc: 512/320,
    vt: [43, 49],
    vKeys: [
      { t:  0 + actorStart, v: [ 380, 270]},
      { t:  6 + actorStart, v: [ -150, 270]},
    ],
    vrid: '1585_preview',
  });
}

{ // FIETSER GEEL HESJE VAN LINKS
  const actorStart = 18;
  createActor(scene, fps, {
    geom: { w: 1, h: 2.5, d: 2.2 },
    keys: [
      { t:  0 + actorStart, v: [ -26, -3, -27]},
      { t:  0.0001 + actorStart, v: [ -26, 0, -27]},
      { t:  9 + actorStart, v: [ -22, 0, -9]},
    ],
    rotateY: Math.PI * 1,
    canvas: { offset: 100, scale: 512/7, size: 512 },
    vSc: 512/320,
    vt: [2, 11],
    vKeys: [
      { t:  0 + actorStart, v: [ -100, 240]},
      { t:  9 + actorStart, v: [ 500, 240]},
    ],
    vrid: '1578_preview',
  });
}