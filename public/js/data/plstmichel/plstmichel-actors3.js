import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 3, westelijk naar muur 1583, hoek met de Seine.
 */

const scene = getDefaultScene([89, 120 ], 'actors3', true);
export default scene;

// { // TEST
//   const actorStart = 0;
//   createActor(scene, fps, {
//     geom: { w: 2.1, h: 2.9, d: 1 },
//     keys: [
//       { t:  0 + actorStart, v: [ 0, 0, 0]},
//       { t: 10 + actorStart, v: [ 0, 0, 0]},
//       // { t:  0 + actorStart, v: [ 30, 0, 46]},
//       // { t:  6 + actorStart, v: [ 30, 0, 46]},
//       // { t:  0 + actorStart, v: [ 0, 0, 0]},
//       // { t: 10 + actorStart, v: [ 0, 0, 0]},
//       // { t:  0 + actorStart, v: [ 30, 0, 46]},
//       // { t:  6 + actorStart, v: [ 30, 0, 46]},
//     ],
//     canvas: { offset: 150, scale: 512/7 , size: 512 },
//     rotateY: Math.PI * -0.5,
//     vSc: 512/250,
//     vt: [162, 172],
//     vKeys: [
//       { t:  0 + actorStart, v: [ 410, 220], a: -0.1},
//       { t:  10 + actorStart, v: [ -60, 220]},
//     ],
//     vrid: '1583_preview',
//   });
// }

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

{ // SNELLE AUTO VAN RECHTS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 7 },
    keys: [
      { t:  0 + actorStart, v: [  5, 0, -12]},
      { t:  3.2 + actorStart, v: [  5, 0, 40]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/9, size: 512 },
    vSc: 512/320,
    vt: [0.5, 4],
    vKeys: [
      { t:  0 + actorStart, v: [ 400, 225]},
      { t:  3.2 + actorStart, v: [ -800, 225]},
    ],
    vrid: '1584_preview',
  });
}

{ // FIETSER VAN RECHTS
  const actorStart = 5;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 3.5 },
    keys: [
      { t:  0 + actorStart, v: [  2, -3.5, -7.5]},
      { t:  0.001 + actorStart, v: [  2, 0, -7.5]},
      { t:  4 + actorStart, v: [  2, 0, 20]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/9, size: 512 },
    vSc: 512/320,
    vt: [49, 54],
    vKeys: [
      { t:  0 + actorStart, v: [ 440, 225]},
      { t:  5 + actorStart, v: [ -1100, 225]},
    ],
    vrid: '1584_preview',
  });
}

{ // SNELLE AUTO VAN RECHTS 2
  const actorStart = 8;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 7 },
    keys: [
      { t:  0 + actorStart, v: [  -3, 0, -14]},
      { t:  3.2 + actorStart, v: [  -3, 0, 42]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/400,
    vt: [62.4, 66.4],
    vKeys: [
      { t:  0 + actorStart, v: [ 400, 240]},
      { t:  3.2 + actorStart, v: [ -900, 225]},
    ],
    vrid: '1584_preview',
  });
}

{ // SNELLE AUTO VAN RECHTS 3
  const actorStart = 9.5;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 7 },
    keys: [
      { t:  0 + actorStart, v: [  -5, -3.5, -11]},
      { t:  0.001 + actorStart, v: [  -5, 0, -11]},
      { t:  3.2 + actorStart, v: [  -5, 0, 30]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/400,
    vt: [67.3, 71.3],
    vKeys: [
      { t:  0 + actorStart, v: [ 400, 240]},
      { t:  3.2 + actorStart, v: [ -900, 225]},
    ],
    vrid: '1584_preview',
  });
}

{ // FIETSER VAN RECHTS 2
  const actorStart = 11;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 3.5 },
    keys: [
      { t:  0 + actorStart, v: [  -8, -3.5, -7.5]},
      { t:  0.001 + actorStart, v: [  -8, 0, -7.5]},
      { t:  4 + actorStart, v: [  -8, 0, 20]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/320,
    vt: [83, 87],
    vKeys: [
      { t:  0 + actorStart, v: [ 370, 215]},
      { t:  5 + actorStart, v: [ -740, 215]},
    ],
    vrid: '1584_preview',
  });
}

{ // SNELLE AUTO VAN RECHTS 4
  const actorStart = 14.5;
  createActor(scene, fps, {
    geom: { w: 1, h: 3, d: 7 },
    keys: [
      { t:  0 + actorStart, v: [  -16, -3.5, -7]},
      { t:  0.001 + actorStart, v: [  -16, 0, -7]},
      { t:  5 + actorStart, v: [  -16, 0, 15]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/120,
    vt: [46, 51],
    vKeys: [
      { t:  0 + actorStart, v: [ 480, 160]},
      { t:  5 + actorStart, v: [ -100, 160]},
    ],
    vrid: '1583_preview',
  });
}
