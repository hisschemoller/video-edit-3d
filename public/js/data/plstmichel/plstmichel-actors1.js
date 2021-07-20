import {
  addLeftRightAnimation,
  getDefaultScene,
  getMatrix,
  fps,
  PREVIEW_SCALE,
} from './plstmichel-shared.js';
import createActor from '../../app/actor.js';
import { uuidv4, } from '../../app/util.js';

const scene = getDefaultScene([0, 55 ], 'actors1', true);
export default scene;

const modelFile = 'plstmichel.glb';

// PAAL
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, 25, 0, 0 ,1],
  modelFile, modelName: 'paal',
});

{ // SCHIJF FONTEIN
  const id = uuidv4(), leftRightDuration = 6, leftRightAngle = 1.75, leftRightBaseAngle = 0, leftRightRotate = 1;
  scene.object.children.push({
    id,
    imageFile: 'plstmichel/fontein-cirkel.png',
    matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, 20, 8, 30 ,1],
    modelFile, modelName: 'disc_fountain',
  });
  addLeftRightAnimation(scene, id, leftRightDuration, leftRightAngle, leftRightBaseAngle, leftRightRotate);
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

{ // MAN EN VROUW VAN RECHTS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  0, 0, -20]},
      { t: 10 + actorStart, v: [ 25.5, 0, -20]},
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

{ // MAN VLAKBIJ KOPTELEFOON
  const actorStart = 1;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 12, -3.5, -35]},
      { t:  0.0001 + actorStart, v: [ 12, 0, -35]},
      { t:  2.5 + actorStart, v: [ 24, 0, -29]},
    ],
    canvas: { offset: 0, scale: 512/10, size: 512 },
    vSc: 512/480,
    vt: [16.5, 19],
    vKeys: [
      { t:  0 + actorStart, v: [ 580, 270]},
      { t:  2.5 + actorStart, v: [ -220, 270]},
    ],
    vrid: '1580_preview',
  });
}

{ // PAAR STIL RECHTS
  const actorStart = 7;
  createActor(scene, fps, {
    geom: { w: 3, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 15, -3.5, -10]},
      { t:  0.0001 + actorStart, v: [ 15, 0, -10]},
      { t:  35 + actorStart, v: [ 15, 0, -10]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 100, scale: 512/4, size: 512 },
    vSc: 512/90,
    vt: [30, 65],
    vKeys: [
      { t:  0 + actorStart, v: [ 380, 192]},
      { t:  35 + actorStart, v: [ 380, 192]},
    ],
    vrid: '1581_preview',
  });
}

{ // MAN TELEFONEREND VAN RECHTS
  const actorStart = 7;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 15, -3.5, -9]},
      { t:  0.01 + actorStart, v: [ 15, 0, -9]},
      { t:  24 + actorStart, v: [ 27, 0, 12]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/20, size: 512 },
    vSc: 512/480,
    vt: [121, 144],
    vKeys: [
      { t:  0 + actorStart, v: [ 365, 195], a: -0.9},
      { t:  13 + actorStart, v: [ 250, 195], a: -0.98},
      { t:  24 + actorStart, v: [ -130, 195 ]},
    ],
    vrid: '1581_preview',
  });
}

{ // VROUW VAN LINKS DICHTBIJ
  const actorStart = 8;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 3, d: 0.5 },
    keys: [
      { t:  0.01 + actorStart, v: [ 30, -3.5, -17]},
      { t:  0.01 + actorStart, v: [ 30, 0, -17]},
      { t:  6 + actorStart, v: [ 10, 0, -14 ]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/10, size: 512 },
    vSc: 512/480,
    vt: [168, 174],
    vKeys: [
      { t:  0 + actorStart, v: [ -100, 260]},
      { t:  6 + actorStart, v: [ 500, 260]},
    ],
    vrid: '1581_preview',
  });
}

{ // FOTOGRAFEREN
  const actorStart = 6;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 22, -3.5, 30]},
      { t:  0.0001 + actorStart, v: [ 22, 0, 30]},
      { t:  45 + actorStart, v: [ 22, 0, 30]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 50, scale: 512/4, size: 512 },
    vSc: 512/100,
    vt: [124, 169],
    vKeys: [
      { t:  0 + actorStart, v: [ 88, 188]},
      { t:  45 + actorStart, v: [ 88, 188]},  
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

{ // VROUW VAN RECHTS 3
  const actorStart = 15;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 10, -3.5, 5]},
      { t:  0.01 + actorStart, v: [ 10, 0, 5]},
      { t:  19 + actorStart, v: [ 27, 0, 25]},
    ],
    canvas: { offset: 0, scale: 512/23, size: 512 },
    vSc: 512/480,
    vt: [72, 91],
    vKeys: [
      { t:  0 + actorStart, v: [ 400, 187], a: 0.8},
      { t:  19 + actorStart, v: [ 60, 187 ]},
    ],
    vrid: '1581_preview',
  });
}

{ // MAN VAN LINKS GYMSCHOENEN
  const actorStart = 18;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [  32, -3.5, 6]},
      { t:  0.01 + actorStart, v: [  32, 0, 6]},
      { t:  14 + actorStart, v: [ 10, 0, 15]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/16, size: 512 },
    vSc: 512/480,
    vt: [94, 108],
    vKeys: [
      { t:  0 + actorStart, v: [ -50, 210], a: 0.85},
      { t:  14 + actorStart, v: [ 370, 210]},
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

{ // VROUW DICHTBIJ VAN LINKS
  const actorStart = 20;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 2.8, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 26.5, -3, 0]},
      { t:  0.0001 + actorStart, v: [ 26.5, 0, 0]},
      { t:  6 + actorStart, v: [ 13, 0, 5]},
    ],
    canvas: { offset: 0, scale: 512/11, size: 512 },
    vSc: 512/480,
    vt: [101, 106],
    vKeys: [
      { t:  0 + actorStart, v: [ -120, 270]},
      { t:  6 + actorStart, v: [ 380, 270]},
    ],
    vrid: '1580_preview',
  });
}

{ // STEL VAN RECHTS
  const actorStart = 20;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 0, -3.5, 18]},
      { t:  0.01 + actorStart, v: [ 0, 0, 18]},
      { t:  21 + actorStart, v: [ 27, 0, 36]},
      { t:  21.01 + actorStart, v: [ 27, -3.5, 36]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/25, size: 512 },
    vSc: 512/480,
    vt: [64, 85],
    vKeys: [
      { t:  0 + actorStart, v: [ 320, 180], a: -0.8},
      { t:  21 + actorStart, v: [ -30, 180 ]},
    ],
    vrid: '1581_preview',
  });
}

{ // VROUW MET LAARZEN VAN RECHTS
  const actorStart = 22;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.9, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 3.5, -3, 15]},
      { t:  0.0001 + actorStart, v: [ 3.5, 0, 15]},
      { t:  10 + actorStart, v: [ 24, 0, 15]},
    ],
    canvas: { offset: 0, scale: 512/14, size: 512 },
    vSc: 512/480,
    vt: [39, 49],
    vKeys: [
      { t:  0 + actorStart, v: [ 355, 235], a: -0.45},
      { t:  10 + actorStart, v: [ -40, 235]},
    ],
    vrid: '1580_preview',
  });
}

{ // MAN VAN LINKS MET RODE TRUI
  const actorStart = 22;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 30, -3.5, 20]},
      { t:  0.01 + actorStart, v: [ 30, 0, 20]},
      { t:  22 + actorStart, v: [ 15, 0, 40]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 0, scale: 512/16, size: 512 },
    vSc: 512/480,
    vt: [0, 22],
    vKeys: [
      { t:  0 + actorStart, v: [ 25, 200], a: -0.8},
      { t: 22 + actorStart, v: [ 380, 200]},
    ],
    vrid: '1581_preview',
  });
}

{ // MAN MET KRUKKEN
  const actorStart = 25;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 0.5 },
    keys: [
      { t:  0 + actorStart, v: [ 30, -3.5, 45]},
      { t:  0.0001 + actorStart, v: [ 30, 0, 45]},
      { t:  30 + actorStart, v: [ 30, 0, 50]},
    ],
    matrix: getMatrix({ ry: Math.PI * 0, }).elements,
    canvas: { offset: 50, scale: 512/9.5, size: 512 },
    vSc: 512/100,
    vt: [0, 30],
    vKeys: [
      { t:  0 + actorStart, v: [ 50, 175]},
      { t: 30 + actorStart, v: [ 50, 175]},
    ],
    vrid: '1580_preview',
  });
}

{ // VROUW VAN RECHTS 2
  const actorStart = 30;
  createActor(scene, fps, {
    geom: { w: 2, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 3, -3.2, 30]},
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
