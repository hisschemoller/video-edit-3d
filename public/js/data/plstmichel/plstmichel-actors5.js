import { getDefaultScene, getMatrix, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createActor from '../../app/actor.js';

/**
 * Actors 5, east towards Rue de la Huchette.
 */

const scene = getDefaultScene([132, 183], 'actors5', true);
export default scene;

{ // MAN GRIJS PAK WACHTEND
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.5, h: 2.5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -25, 0, -22]},
      { t: 10 + actorStart, v: [ -25, 0, -22]}, 
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [3, 13],
    vKeys: [
      { t:  0 + actorStart, v: [ 220, 170 ]},
      { t: 10 + actorStart, v: [ 220, 170 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // MENSEN WACHTEND VOOR STOPLICHT
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -15, 0, -20]},
      { t: 20 + actorStart, v: [ -15, 0, -20]},
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [0, 20],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 175 ]},
      { t: 20 + actorStart, v: [ 0, 175 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // TWEE MEISJES PRATEND
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.8, h: 2.8, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -10, 0, -16]},
      { t: 20 + actorStart, v: [ -10, 0, -16]},
    ],
    canvas: { offset: 0, scale: 512/19, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [0, 20],
    vKeys: [
      { t:  0 + actorStart, v: [ 160, 185 ]},
      { t: 20 + actorStart, v: [ 160, 185 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // PLANTENBAK
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 2.5, h: 6, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -6, 0, -6]},
      { t: 20 + actorStart, v: [ -6, 0, -6]},
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [0, 20],
    vKeys: [
      { t:  0 + actorStart, v: [ 370, 180 ]},
      { t: 20 + actorStart, v: [ 370, 180 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // TWEE MEISJES MET TELEFOONS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.8, h: 3, d: 1 },
    keys: [
      { t:   0 + actorStart, v: [ 18, 0, -13]},
      { t: 100 + actorStart, v: [ 18, 0, -13]},
    ],
    canvas: { offset: 50, scale: 512/19, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [166, 266],
    vKeys: [
      { t:   0 + actorStart, v: [ 145, 195 ]},
      { t: 100 + actorStart, v: [ 145, 195 ]},
    ],
    vrid: '1600_preview',
  });
}

{ // WACHTENDE JONGEN BRUINE JAS
  const actorStart = 0;
  createActor(scene, fps, {
    geom: { w: 1.8, h: 2.8, d: 1 },
    keys: [
      { t:   0 + actorStart, v: [ 19, 0, -17]},
      { t: 100 + actorStart, v: [ 19, 0, -17]},
    ],
    canvas: { offset: 50, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [156, 186],
    vKeys: [
      { t:   0 + actorStart, v: [ 110, 180 ]},
      { t: 100 + actorStart, v: [ 110, 180 ]},
    ],
    vrid: '1600_preview',
  });
}

{ // WACHTENDE VROUW JAS UITTREKKEN
  const actorStart = 2;
  createActor(scene, fps, {
    geom: { w: 1.8, h: 2.8, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 19, 0, -5]},
      { t: 38 + actorStart, v: [ 19, 0, -5]},
    ],
    canvas: { offset: 50, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [30, 68],
    vKeys: [
      { t:  0 + actorStart, v: [ 170, 185 ]},
      { t: 38 + actorStart, v: [ 170, 185 ]},
    ],
    vrid: '1600_preview',
  });
}

{ // WACHTENDE MAN ALPINOPET
  const actorStart = 4;
  createActor(scene, fps, {
    geom: { w: 1.5, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 16, 0, 0]},
      { t: 32 + actorStart, v: [ 16, 0, 0]},
    ],
    canvas: { offset: 50, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [36, 68],
    vKeys: [
      { t:  0 + actorStart, v: [ 298, 185 ]},
      { t: 32 + actorStart, v: [ 298, 185 ]},
    ],
    vrid: '1600_preview',
  });
}

{ // DRIE VAN LINKS NAAR RECHTS
  const actorStart = 4;
  createActor(scene, fps, {
    geom: { w: 4, h: 2.6, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -5, -3, -30]},
      { t:  0.0001 + actorStart, v: [ -5, 0, -30]},
      { t: 16 + actorStart, v: [ -0, 0, 0]},
      { t: 16.0001 + actorStart, v: [ -0, -3, 0]},
    ],
    canvas: { offset: 0, scale: 512/24, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [27, 43],
    vKeys: [
      { t:  0 + actorStart, v: [ 0, 185 ]},
      { t: 16 + actorStart, v: [ 460, 185 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // MAN NAAR LINKS
  const actorStart = 5;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.8, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ -5, 0, -5]},
      { t: 13 + actorStart, v: [ -5, 0, -18]},
      { t: 13.0001 + actorStart, v: [ -5, -3, -18]},
    ],
    canvas: { offset: 0, scale: 512/31, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [42, 55],
    vKeys: [
      { t:  0 + actorStart, v: [ 510, 180 ]},
      { t: 13 + actorStart, v: [ 160, 180 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // VROUW GROENE JAS NAAR RECHTS
  const actorStart = 10;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.8, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 5, -3, -22]},
      { t:  0.0001 + actorStart, v: [ 5, 0, -22]},
      { t: 17 + actorStart, v: [ 5, 0, 0]},
      { t: 17.0001 + actorStart, v: [ 5, -3, 0]},
    ],
    canvas: { offset: 0, scale: 512/31, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [89, 106],
    vKeys: [
      { t:  0 + actorStart, v: [ -10, 175 ]},
      { t: 17 + actorStart, v: [ 520, 185 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // FIETSER NAAR RECHTS
  const actorStart = 28;
  createActor(scene, fps, {
    geom: { w: 3.6, h: 3.2, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 20, -3.5, -28]},
      { t:  0.0001 + actorStart, v: [ 20, 0, -28]},
      { t: 11 + actorStart, v: [ 20, 0, 18]},
    ],
    canvas: { offset: 0, scale: 512/26, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [16, 27],
    vKeys: [
      { t:  0 + actorStart, v: [ -10, 180 ]},
      { t: 11 + actorStart, v: [ 570, 195 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // WITTE BESTELAUTO NAAR LINKS
  const actorStart = 29;
  createActor(scene, fps, {
    geom: { w: 4.5, h: 2.6, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 22, -3, 8]},
      { t: 0.0001 + actorStart, v: [ 22, 0, 8]},
      { t: 6 + actorStart, v: [ 22, 0, -30]},
    ],
    canvas: { offset: 0, scale: 512/25, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [156, 162],
    vKeys: [
      { t: 0 + actorStart, v: [ 540, 165 ]},
      { t: 6 + actorStart, v: [ -120, 165 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // ZWART BUSJE NAAR LINKS
  const actorStart = 31;
  createActor(scene, fps, {
    geom: { w: 8, h: 3.5, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 24, -4, 6]},
      { t: 0.0001 + actorStart, v: [ 24, 0, 6]},
      { t: 6 + actorStart, v: [ 24, 0, -30]},
    ],
    canvas: { offset: 0, scale: 512/23, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [150, 156],
    vKeys: [
      { t:  0 + actorStart, v: [ 460, 165 ]},
      { t: 6 + actorStart, v: [ -170, 165 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // BUS NAAR RECHTS
  const actorStart = 32;
  createActor(scene, fps, {
    geom: { w: 15, h: 5, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 30, -5, -44]},
      { t:  0.0001 + actorStart, v: [ 30, 0, -44]},
      { t: 10 + actorStart, v: [ 30, 0, 30]},
    ],
    canvas: { offset: 0, scale: 512/25, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [90, 96],
    vKeys: [
      { t:  0 + actorStart, v: [ -380, 170 ]},
      { t: 11 + actorStart, v: [ 1100, 170 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // FIETSER NAAR LINKS
  const actorStart = 34;
  createActor(scene, fps, {
    geom: { w: 3.6, h: 3.2, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 33, -3.5, 8]},
      { t: 0.0001 + actorStart, v: [ 33, 0, 8]},
      { t: 8 + actorStart, v: [ 33, 0, -25]},
    ],
    canvas: { offset: 0, scale: 512/23, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [117, 125],
    vKeys: [
      { t:  0 + actorStart, v: [ 510, 195 ], a: 0.2},
      { t: 8 + actorStart, v: [ -50, 185 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // GRIJZE AUTO NAAR LINKS
  const actorStart = 36;
  createActor(scene, fps, {
    geom: { w: 5, h: 3, d: 1 },
    keys: [
      { t:  0 + actorStart, v: [ 31, -4, 0]},
      { t:  0.0001 + actorStart, v: [ 31, 0, 0]},
      { t: 4 + actorStart, v: [ 31, 0, -30]},
    ],
    canvas: { offset: 0, scale: 512/25, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [95, 99],
    vKeys: [
      { t:  0 + actorStart, v: [ 330, 170 ]},
      { t: 4 + actorStart, v: [ -150, 170 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // RODE AUTO NAAR LINKS
  const actorStart = 38;
  createActor(scene, fps, {
    geom: { w: 4.5, h: 2.6, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 37, -3, 0]},
      { t: 0.0001 + actorStart, v: [ 37, 0, 0]},
      { t: 6 + actorStart, v: [ 37, 0, -30]},
    ],
    canvas: { offset: 0, scale: 512/25, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [152, 158],
    vKeys: [
      { t:  0 + actorStart, v: [ 510, 165 ]},
      { t: 6 + actorStart, v: [ -100, 165 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // ZWARTE AUTO NAAR RECHTS
  const actorStart = 39;
  createActor(scene, fps, {
    geom: { w: 6, h: 2.5, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 35, -3, -29]},
      { t: 0.0001 + actorStart, v: [ 35, 0, -29]},
      { t: 5 + actorStart, v: [ 35, 0, 8]},
    ],
    canvas: { offset: 0, scale: 512/22, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [95, 100],
    vKeys: [
      { t:  0 + actorStart, v: [ -80, 170 ]},
      { t: 5 + actorStart, v: [ 520, 170 ]},
    ],
    vrid: '1602_preview',
  });
}

{ // MAN ORANJE HESJE NAAR RECHTS
  const actorStart = 32;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 40, -3, -30]},
      { t: 0.0001 + actorStart, v: [ 40, 0, -30]},
      { t: 14 + actorStart, v: [ 40, 0, 0]},
    ],
    canvas: { offset: 0, scale: 512/31, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [99, 113],
    vKeys: [
      { t:  0 + actorStart, v: [ -10, 175 ]},
      { t: 14 + actorStart, v: [ 485, 185 ]},
    ],
    vrid: '1582_preview',
  });
}

{ // MAN RODE BOODSCHAPPENTAS NAAR RECHTS
  const actorStart = 37;
  createActor(scene, fps, {
    geom: { w: 2, h: 2.8, d: 1 },
    keys: [
      { t: 0 + actorStart, v: [ 41, -3, -30]},
      { t: 0.0001 + actorStart, v: [ 41, 0, -30]},
      { t: 17 + actorStart, v: [ 41, 0, 0]},
    ],
    canvas: { offset: 0, scale: 512/28, size: 512 },
    rotateY: Math.PI * -0.5,
    vSc: 512/480,
    vt: [93, 110],
    vKeys: [
      { t:  0 + actorStart, v: [ 10, 175 ]},
      { t: 17 + actorStart, v: [ 465, 185 ]},
    ],
    vrid: '1582_preview',
  });
}
