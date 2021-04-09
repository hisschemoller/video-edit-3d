import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * 
 */

const scene = getDefaultScene([54, 88 ], 'actors2', true);
export default scene;

{ // MAN ALPINOPET VOOR STOPLICHT
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2, h: 4, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  43, 0, 30]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/6, size: 512 },
    vSc: 512/100,
    vt: [42, 62],
    vKeys: [
      { t:  0 + actorStart, v: [ 290, 190]},
    ],
    vrid: '1600_preview',
  });
}

{ // TWEE MANNEN VAN RECHTS
  const actorStart = 3;
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

