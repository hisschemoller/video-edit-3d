import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 6, passing Notre Dame.
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
