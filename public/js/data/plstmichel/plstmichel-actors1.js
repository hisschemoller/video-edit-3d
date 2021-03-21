import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 320], 'actors1', true);
export default scene;

{ // MAN EN VROUW VAN RECHTS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  0, 0, -20]},
      { t:  8 + actorStart, v: [ 25.5, 0, -20]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/9, size: 512 },
    vSc: 512/480,
    vt: [23, 33],
    vKeys: [
      { t:  0 + actorStart, v: [ 550, 250]},
      { t:  10 + actorStart, v: [ -200, 250]},
    ],
    vrid: '1581_preview',
  });
}

{ // MAN VAN LINKS VLAKBIJ
  const actorStart = 10;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  33, 0, -10]},
      { t:  8 + actorStart, v: [ 5, 0, -3]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/9, size: 512 },
    vSc: 512/480,
    vt: [106, 117],
    vKeys: [
      { t:  0 + actorStart, v: [ -200, 250]},
      { t:  10 + actorStart, v: [ 750, 250]},
    ],
    vrid: '1581_preview',
  });
}
