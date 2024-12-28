import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 7, towards end and start.
 */

const scene = getDefaultScene([197, 215.16], 'actors7', true);
export default scene;

{ // RENNER OVERKANT NAAR LINKS
  const actorStart = 2;
  createActor(scene, fps, {
    geom: { w: 2.8, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 47.5, -3, -49.5]},
      { t: 0.0001 + actorStart, v: [ 47.5, 0, -49.5]},
      { t: 9 + actorStart, v: [ 0, 0, -49.5]},
    ],
    canvas: { offset: 50, scale: 512/44 , size: 512 },
    rotateY: Math.PI * 1,
    vSc: 512/480,
    vt: [67, 76],
    vKeys: [
      { t: 0 + actorStart, v: [ 280, 190 ]},
      { t: 9 + actorStart, v: [ -10, 190 ]},
    ],
    vrid: '1628_preview',
  });
}

{ // STILSTAANDE RACEFIETSER
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2, h: 3.5, d: 0.5 },
    keys: [
      { t: 0 + actorStart, v: [ 27, 0, -46]},
      { t: 10 + actorStart, v: [ 27, 0, -46]},
    ],
    canvas: { offset: 150, scale: 512/38 , size: 512 },
    rotateY: Math.PI * 0.5,
    vSc: 512/480,
    vt: [110, 120],
    vKeys: [
      { t: 0 + actorStart, v: [ 288, 190 ]},
      { t: 10 + actorStart, v: [ 288 , 190 ]},
    ],
    vrid: '1579_preview',
  });
}

{ // FIETSKARRETJE
  const actorStart = 5;
  createActor(scene, fps, {
    geom: { w: 3, h: 3.5, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 25, -4, -47.5]},
      { t: 0.0001 + actorStart, v: [ 25, 0, -47.5]},
      { t: 6 + actorStart, v: [ 25, 0, -36]},
    ],
    canvas: { offset: 150, scale: 512/33, size: 512 },
    rotateY: Math.PI * 0.5,
    vSc: 512/480,
    vt: [96, 102],
    vKeys: [
      { t: 0 + actorStart, v: [ 288, 190 ]},
      { t: 6 + actorStart, v: [ 60, 190 ]},
    ],
    vrid: '1579_preview',
  });
}

{ // BLAUWE VRACHTWAGEN NAAR LINKS
  const actorStart = 8;
  createActor(scene, fps, {
    geom: { w: 7, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 15, 0, -50.5]},
      { t: 4 + actorStart, v: [ 15, 0, -20]},
      { t: 4.0001 + actorStart, v: [ 15, -4, -20]},
    ],
    canvas: { offset: 150, scale: 512/28, size: 512 },
    rotateY: Math.PI * 0.5,
    vSc: 512/480,
    vt: [109, 113],
    vKeys: [
      { t: 0 + actorStart, v: [ 270, 180 ]},
      { t: 4 + actorStart, v: [ -20, 180 ]},
    ],
    vrid: '1579_preview',
  });
}

{ // ROOD BUSJE NAAR LINKS
  const actorStart = 10;
  createActor(scene, fps, {
    geom: { w: 5, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 10, 0, -50.5]},
      { t: 3 + actorStart, v: [ 10, 0, -20]},
      { t: 3.0001 + actorStart, v: [ 10, -4, -20]},
    ],
    canvas: { offset: 150, scale: 512/40, size: 512 },
    rotateY: Math.PI * 0.5,
    vSc: 512/480,
    vt: [126, 129],
    vKeys: [
      { t: 0 + actorStart, v: [ 250, 185 ]},
      { t: 3 + actorStart, v: [ -45, 185 ]},
    ],
    vrid: '1579_preview',
  });
}

{ // WITTE AUTO NAAR LINKS
  const actorStart = 11.3;
  createActor(scene, fps, {
    geom: { w: 5, h: 2.5, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 10, 0, -50.5]},
      { t: 3 + actorStart, v: [ 10, 0, -20]},
      { t: 3.0001 + actorStart, v: [ 10, -4, -20]},
    ],
    canvas: { offset: 150, scale: 512/36, size: 512 },
    rotateY: Math.PI * 0.5,
    vSc: 512/480,
    vt: [124, 127],
    vKeys: [
      { t: 0 + actorStart, v: [ 280, 185 ]},
      { t: 3 + actorStart, v: [ -50, 185 ]},
    ],
    vrid: '1579_preview',
  });
}

{ // FIETSER NAAR RECHTS
  const actorStart = 12.5;
  createActor(scene, fps, {
    geom: { w: 4, h: 3, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 8, 0, -20]},
      { t: 4 + actorStart, v: [ 8, 0, -45]},
    ],
    canvas: { offset: 150, scale: 512/26, size: 512 },
    rotateY: Math.PI * 0.5,
    vSc: 512/480,
    vt: [96, 100],
    vKeys: [
      { t: 0 + actorStart, v: [ 40, 175 ]},
      { t: 4 + actorStart, v: [ 540, 175 ]},
    ],
    vrid: '1583_preview',
  });
}

// DEZE WAS AL UITGECOMMENTARIEERD
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
