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
      { t:  0 + actorStart, v: [  -28, 0, -2]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/10, size: 512 },
    vSc: 512/320,
    vt: [21, 52],
    vKeys: [
      { t:  0 + actorStart, v: [ 150, 215]},
    ],
    vrid: '1584_preview',
  });
}
