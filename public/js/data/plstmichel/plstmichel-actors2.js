import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * 
 */
const EARLIER = 11;
const scene = getDefaultScene([54 - EARLIER, 88 ], 'actors2', true);
export default scene;

{ // ROKENDE MAN
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 4, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 35, 0, 43]},
      { t:  8 + actorStart, v: [ 35, 0, 43]},
    ],
    canvas: { offset: 150, scale: 512/7, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/120,
    vt: [178, 186],
    vKeys: [
      { t:  0 + actorStart, v: [ 370, 202]},
      { t:  8 + actorStart, v: [ 370, 202]},
    ],
    vrid: '1578_preview',
  });
}

{ // VROUW RODE JAS VAN LINKS
  const actorStart = 6;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 4, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 44, 0, 36]},
      { t:  8 + actorStart, v: [ 36, 0, 48]},
    ],
    canvas: { offset: 150, scale: 512/7, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/120,
    vt: [104, 112],
    vKeys: [
      { t:  0 + actorStart, v: [ 150, 202], a: -0.4},
      { t:  8 + actorStart, v: [ 455, 202]},
    ],
    vrid: '1578_preview',
  });
}

{ // MAN GRIJZE JAS VAN LINKS
  const actorStart = 9;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 4.5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 44, 0, 30]},
      { t:  6 + actorStart, v: [ 36, 0, 48]},
    ],
    canvas: { offset: 150, scale: 512/7, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/120,
    vt: [109, 115],
    vKeys: [
      { t:  0 + actorStart, v: [ 160, 202], a: 0},
      { t:  6 + actorStart, v: [ 500, 202]},
    ],
    vrid: '1578_preview',
  });
}

{ // MAN RODE JAS VAN LINKS
  const actorStart = 12;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 3, d: 1 },
    keys: [
       { t:  0 + actorStart, v: [ 38, 0, 27]},
      { t:  8 + actorStart, v: [ 45, 0, 48]},
      // { t:  0 + actorStart, v: [ 30, 0, 46]},
      // { t:  8 + actorStart, v: [ 30, 0, 46]},
    ],
    canvas: { offset: 150, scale: 512/5, size: 512 },
    rotateY: Math.PI * -0.25,
    vSc: 512/250,
    vt: [61, 69],
    vKeys: [
      { t:  0 + actorStart, v: [ -50, 270], a: 0.6},
      { t:  8 + actorStart, v: [ 500, 270]},
    ],
    vrid: '1578_preview',
  });
}

{ // VROUW BLAUWE JAS VAN RECHTS
  const actorStart = 18;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 3, d: 1 },
    keys: [
        { t:  0 + actorStart, v: [ 55, 0, 18]},
      { t:  8 + actorStart, v: [ 30, 0, 18]},
      // { t:  0 + actorStart, v: [ 30, 0, 46]},
      // { t:  6 + actorStart, v: [ 30, 0, 46]},
    ],
    canvas: { offset: 150, scale: 512/5, size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/250,
    vt: [63, 69],
    vKeys: [
      { t:  0 + actorStart, v: [ 480, 270], a: 0.4 },
      { t:  6 + actorStart, v: [ -50, 270]},
    ],
    vrid: '1578_preview',
  });
}

{ // MAN ALPINOPET VOOR STOPLICHT
  const actorStart = 0 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 2, h: 4, d: 3 },
    keys: [
      { t:  0 + actorStart, v: [  43, 0, 30]},
      { t: 20 + actorStart, v: [  43, 0, 30]},
    ],
    canvas: { offset: 150, scale: 512/7, size: 512 },
    vSc: 512/120,
    vt: [42, 62],
    vKeys: [
      { t:  0 + actorStart, v: [ 290, 190]},
      { t: 20 + actorStart, v: [ 290, 190]},
    ],
    vrid: '1600_preview',
  });
}

{ // TWEE MANNEN VAN RECHTS
  const actorStart = 3 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  49, -3.5, 27]},
      { t:  0.01 + actorStart, v: [  49, 0, 27]},
      { t:  8 + actorStart, v: [  31, 0, 21]},
    ],
    matrix: getMatrix({ ry: Math.PI * 1, }).elements,
    canvas: { offset: 100, scale: 512/4, size: 512 },
    vSc: 512/250,
    vt: [58, 66],
    vKeys: [
      { t:  0 + actorStart, v: [ 550, 270]},
      { t:  8 + actorStart, v: [ -150, 270]},
    ],
    vrid: '1600_preview',
  });
}

{ // MUUR NOTRE DAME VERKEER
  const actorStart = 0 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 20, h: 4, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 30, 0, 0]},
      { t: 34 + actorStart, v: [ 30, 0, 0]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/25, size: 512 },
    vSc: 512/440,
    vt: [20, 20 + 34],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 220]},
      { t: 34 + actorStart, v: [ 0, 220]},
    ],
    vrid: '1628_preview',
  });
}

{ // GROENE FIETS VAN LINKS
  const actorStart = 9 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t:  0.01 + actorStart, v: [  24, 0, 15]},
      { t:  6 + actorStart, v: [  60, 0, 14]},
    ],
    matrix: getMatrix({ ry: Math.PI * 1, }).elements,
    canvas: { offset: 100, scale: 512/7, size: 512 },
    vSc: 512/250,
    vt: [65, 71],
    vKeys: [
      { t:  0 + actorStart, v: [ -100, 260]},
      { t:  6 + actorStart, v: [ 700, 260]},
    ],
    vrid: '1628_preview',
  });
}

{ // SKATEBOARDER VAN RECHTS
  const actorStart = 13 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 0.5 },
    keys: [
      { t:  0.01 + actorStart, v: [  55, 0, 10]},
      { t:  6 + actorStart, v: [  25, 0, 10]},
    ],
    matrix: getMatrix({ ry: Math.PI * 1, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/250,
    vt: [82.3, 89.3],
    vKeys: [
      { t:  0 + actorStart, v: [ 600, 225]},
      { t:  6 + actorStart, v: [ -100, 225]},
    ],
    vrid: '1628_preview',
  });
}
