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

{ // VROUW OP FIETS NAAR RECHTS
  const actorStart = 16;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 35, 0, -30]},
      { t: 4 + actorStart, v: [ 50, 0, -30]},
    ],
    canvas: { offset: 50, scale: 512/14 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [65, 69],
    vKeys: [
      { t: 0 + actorStart, v: [ -80, 250 ]},
      { t: 4 + actorStart, v: [ 440, 250 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // MAN OP RACEFIETS NAAR RECHTS
  const actorStart = 17;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 35, -3.5, -24]},
      { t: 0.0001 + actorStart, v: [ 35, 0, -24]},
      { t: 2 + actorStart, v: [ 50, 0, -24]},
    ],
    canvas: { offset: 50, scale: 512/14 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [69.9, 71.9],
    vKeys: [
      { t: 0 + actorStart, v: [ -80, 250 ]},
      { t: 2 + actorStart, v: [ 440, 250 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // MAN OP STEP NAAR RECHTS
  const actorStart = 18;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 35, -3.5, -25]},
      { t: 0.0001 + actorStart, v: [ 35, 0, -25]},
      { t: 3 + actorStart, v: [ 50, 0, -25]},
    ],
    canvas: { offset: 50, scale: 512/14 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [138, 141],
    vKeys: [
      { t: 0 + actorStart, v: [ -80, 250 ]},
      { t: 3 + actorStart, v: [ 440, 250 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // FIETS NAAR RECHTS
  const actorStart = 20;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 32, 0, -30]},
      { t: 3 + actorStart, v: [ 48, 0, -30]},
    ],
    canvas: { offset: 50, scale: 512/16 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [73.7, 76.7],
    vKeys: [
      { t: 0 + actorStart, v: [ -100, 240 ]},
      { t: 3 + actorStart, v: [ 480, 240 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // MAN OVERKANT RODE JAS NAAR RECHTS
  const actorStart = 18;
  createActor(scene, fps, {
    geom: { w: 2, h: 3.2, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 22, 0, -48]},
      { t: 9 + actorStart, v: [ 52.2, 0, -48]},
    ],
    canvas: { offset: 50, scale: 512/55 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [61, 71],
    vKeys: [
      { t: 0 + actorStart, v: [ 115, 190 ]},
      { t: 10 + actorStart, v: [ 285, 190 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // MAN OVERKANT SPIJKERBROEK NAAR RECHTS
  const actorStart = 23;
  createActor(scene, fps, {
    geom: { w: 2, h: 3.2, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 22, 0, -48]},
      { t: 9 + actorStart, v: [ 50, 0, -48]},
    ],
    canvas: { offset: 50, scale: 512/55 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [66, 76],
    vKeys: [
      { t: 0 + actorStart, v: [ 90, 190 ]},
      { t: 10 + actorStart, v: [ 300, 190 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // RODE AUTO NAAR LINKS
  const actorStart = 20;
  createActor(scene, fps, {
    geom: { w: 5.5, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 55.6, 0, -38]},
      { t: 3 + actorStart, v: [ 30, 0, -38]},
    ],
    canvas: { offset: 50, scale: 512/28 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [81, 84],
    vKeys: [
      { t: 0 + actorStart, v: [ 470, 205 ]},
      { t: 3 + actorStart, v: [ -170, 205 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // DONKERBLAUWE AUTO NAAR LINKS
  const actorStart = 22;
  createActor(scene, fps, {
    geom: { w: 6.5, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 56.6, 0, -40]},
      { t: 6 + actorStart, v: [ 30, 0, -40]},
    ],
    canvas: { offset: 50, scale: 512/28 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [61, 67],
    vKeys: [
      { t: 0 + actorStart, v: [ 520, 205 ]},
      { t: 6 + actorStart, v: [ -120, 205 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // GROTE SCOOTER NAAR LINKS
  const actorStart = 23;
  createActor(scene, fps, {
    geom: { w: 3.5, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 53.6, 0, -37]},
      { t: 2 + actorStart, v: [ 34, 0, -37]},
    ],
    canvas: { offset: 50, scale: 512/34 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [71, 73],
    vKeys: [
      { t: 0 + actorStart, v: [ 410, 200 ]},
      { t: 2 + actorStart, v: [ -140, 200 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // STEP OVERKANT NAAR LINKS
  const actorStart = 25;
  createActor(scene, fps, {
    geom: { w: 2.8, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 53, 0, -45]},
      { t: 4 + actorStart, v: [ 28, 0, -45]},
      { t: 4.0001 + actorStart, v: [ 28, -3, -45]},
    ],
    canvas: { offset: 50, scale: 512/38 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [43, 47],
    vKeys: [
      { t: 0 + actorStart, v: [ 250, 196 ], a: -0.3},
      { t: 4 + actorStart, v: [ -10, 196 ]},
    ],
    vrid: '1628_preview',
  });
}

// { // GROTE SCOOTER NAAR LINKS
//   const actorStart = 0;
//   createActor(scene, fps, {
//     geom: { w: 3.5, h: 2.8, d: 1 },
//     keys: [
//       { t: 0 + actorStart, v: [ 40, 0, -20]},
//       { t: 2 + actorStart, v: [ 40, 0, -20]},
//     ],
//     canvas: { offset: 50, scale: 512/34 , size: 512 },
//     rotateY: Math.PI * -0.5,
//     vSc: 512/480,
//     vt: [71, 73],
//     vKeys: [
//       { t: 0 + actorStart, v: [ 410, 200 ]},
//       { t: 2 + actorStart, v: [ -140, 200 ]},
//     ],
//     vrid: '1628_preview',
//   });
// }
