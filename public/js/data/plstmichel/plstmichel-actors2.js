import {
  getDefaultScene,
  getMatrix,
  fps, 
  modelFile,
  PREVIEW_SCALE, 
} from './plstmichel-shared.js';
import createActor from '../../app/actor.js';
import { uuidv4, } from '../../app/util.js';

/**
 * Actors 2, vanaf fontein bocht naar Notre Dame en verder naar oosten.
 */
const EARLIER = 11;
const scene = getDefaultScene([54 - EARLIER, 95 ], 'actors2', true);
export default scene;

// TEKENING 5 - GRIJS DING
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/tekening5en6.png',
  matrix: getMatrix({ x: 26, y: 0, z: 46, ry: Math.PI * 0, }).elements,
  modelFile, modelName: 'tekening5',
});

// WOLK NOTRE DAME
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/sky-1628.jpg',
  matrix: getMatrix({ x: 45, y: 17, z: -42, ry: Math.PI * 1, sx: 2, sy: 2, }).elements,
  modelFile, modelName: 'wolk1',
});

// WOLK BOULEVARD DU PALAIS
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/sky-1579.jpg',
  matrix: getMatrix({ x: 5, y: 15, z: -47, ry: Math.PI * 1, sx: 1.8, sy: 1.8, }).elements,
  modelFile, modelName: 'wolk2',
});

// BOL LAMPEN EN PALEN
[-20, -0.5, 10, 20, 30, 40].forEach((z) => {
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/bol-lamp.png',
    matrix: getMatrix({ x: 46, y: 7, z, sx: 0.5, sy: 0.5, sz: 0.5, }).elements,
    modelFile, modelName: 'bollamp',
  });

  if (z < 30) {
    scene.object.children.push({
      id: uuidv4(),
      imageFile: 'plstmichel/boomstammen.png',
      matrix: getMatrix({ x: 46, y: 0, z, sx: 0.4, sz: 0.4, }).elements,
      modelFile, modelName: 'paal',
    });
  }
});

{ // ROKENDE MAN
  const actorStart = 2;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 4, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 35, 0, 43]},
      { t:  13 + actorStart, v: [ 35, 0, 43]},
    ],
    canvas: { offset: 150, scale: 512/7, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/120,
    vt: [177, 190],
    vKeys: [
      { t:  0 + actorStart, v: [ 370, 202]},
      { t:  13 + actorStart, v: [ 370, 202]},
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

{ // VROUW STEEKT OVER NAAR RECHTS
  const actorStart = 17 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 2.1, h: 2.8, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 28, -3, 10]},
      { t:  0.0001 + actorStart, v: [ 28, 0, 10]},
      { t: 12 + actorStart, v: [ 28, 0, -7]},
    ],
    canvas: { offset: 150, scale: 512/11, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/250,
    vt: [45, 57],
    vKeys: [
      { t:  0 + actorStart, v: [ -40, 205], a: 0},
      { t:  12 + actorStart, v: [ 305, 205]},
    ],
    vrid: '1603_preview',
  });
}

{ // MAN STEEKT OVER NAAR RECHTS
  const actorStart = 23 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 2.1, h: 2.9, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 22, -3, 4]},
      { t:  0.0001 + actorStart, v: [ 22, 0, 4]},
      { t: 7 + actorStart, v: [ 22, 0, -13]},
    ],
    canvas: { offset: 150, scale: 512/11, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/250,
    vt: [52, 59],
    vKeys: [
      { t:  0 + actorStart, v: [ -20, 205], a: 0},
      { t:  7 + actorStart, v: [ 270, 205]},
    ],
    vrid: '1603_preview',
  });
}

{ // MAN STEEKT SNEL OVER NAAR RECHTS
  const actorStart = 26 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 2.1, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 16, 0, 5]},
      { t:  0.0001 + actorStart, v: [ 16, 0, 5]},
      { t: 6 + actorStart, v: [ 16, 0, -13]},
    ],
    canvas: { offset: 150, scale: 512/10, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/250,
    vt: [79, 85],
    vKeys: [
      { t:  0 + actorStart, v: [ -50, 210], a: 0},
      { t:  6 + actorStart, v: [ 310, 210]},
    ],
    vrid: '1603_preview',
  });
}

{ // VROUW OP STOEP NAAR LINKS
  const actorStart = 27 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 2.1, h: 2.9, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 16, -3, -15]},
      { t:  0.0001 + actorStart, v: [ 16, 0, -15]},
      { t: 6 + actorStart, v: [ 16, 0, 4.5]},
    ],
    canvas: { offset: 150, scale: 512/7 , size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/250,
    vt: [162, 172],
    vKeys: [
      { t:  0 + actorStart, v: [ 410, 220], a: -0.1},
      { t:  10 + actorStart, v: [ -60, 220]},
    ],
    vrid: '1583_preview',
  });
}

{ // WITTE VRACHTWAGEN VAN RECHTS
  const actorStart = 30 + EARLIER;
  createActor(scene, fps, {
    geom: { w: 8, h: 3.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 14, 0, -28]},
      { t: 7 + actorStart, v: [ 12, 0, 8]},
    ],
    canvas: { offset: 150, scale: 512/19 , size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/250,
    vt: [190, 197],
    vKeys: [
      { t:  0 + actorStart, v: [ 520, 155], a: 0},
      { t:  7 + actorStart, v: [ -30, 155 ]},
    ],
    vrid: '1583_preview',
  });
}
