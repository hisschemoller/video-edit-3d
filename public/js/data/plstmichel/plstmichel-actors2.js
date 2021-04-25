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
    geom: { w: 2, h: 4, d: 3 },
    keys: [
      { t:  0 + actorStart, v: [  43, 0, 30]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 150, scale: 512/7, size: 512 },
    vSc: 512/120,
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

{ // MUUR NOTRE DAME VERKEER
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 20, h: 4, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 30, 0, 0]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/25, size: 512 },
    vSc: 512/440,
    vt: [20, 20 + 34],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 220]},
    ],
    vrid: '1628_preview',
  });
}

{ // GROENE FIETS VAN LINKS
  const actorStart = 9;
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
  const actorStart = 13;
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
