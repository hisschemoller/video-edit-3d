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
    geom: { w: 2.5, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  33, -3.1, -10]},
      { t:  0.01 + actorStart, v: [  33, 0, -10]},
      { t:  8 + actorStart, v: [ 8, 0, -3]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/9, size: 512 },
    vSc: 512/480,
    vt: [106.5, 117.5],
    vKeys: [
      { t:  0 + actorStart, v: [ -200, 250]},
      { t:  10 + actorStart, v: [ 800, 250]},
    ],
    vrid: '1581_preview',
  });
}

{ // PAAR STIL LINKS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [  20, 0, 40]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/4, size: 512 },
    vSc: 512/100,
    vt: [10, 65],
    vKeys: [
      { t:  0 + actorStart, v: [ 50, 192]},
    ],
    vrid: '1581_preview',
  });
}

{ // PAAR STIL RECHTS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [  15, 0, -10]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/4, size: 512 },
    vSc: 512/90,
    vt: [30, 65],
    vKeys: [
      { t:  0 + actorStart, v: [ 380, 192]},
    ],
    vrid: '1581_preview',
  });
}

{ // VROUW VAN RECHTS
  const actorStart = 20;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  6, -3.2, 8]},
      { t:  0.01 + actorStart, v: [  6, 0, 8]},
      { t:  8 + actorStart, v: [ 32, 0, 10]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/10, size: 512 },
    vSc: 512/480,
    vt: [56, 62],
    vKeys: [
      { t:  0 + actorStart, v: [ 450, 270]},
      { t:  6 + actorStart, v: [ -120, 270]},
    ],
    vrid: '1581_preview',
  });
}

{ // VROUW VAN RECHTS 2
  const actorStart = 30;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 1 },
    keys: [
      { t:  0.01 + actorStart, v: [ 3, 0, 30]},
      { t:  12 + actorStart, v: [ 27, 0, 30]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/23, size: 512 },
    vSc: 512/480,
    vt: [36.5, 48],
    vKeys: [
      { t:  0 + actorStart, v: [ 260, 180]},
      { t:  12 + actorStart, v: [ -50, 180 ]},
    ],
    vrid: '1581_preview',
  });
}
