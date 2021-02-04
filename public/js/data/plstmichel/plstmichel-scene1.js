import { getDefaultScene, fps, } from './plstmichel-shared.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 180], 1, false);

function createFacade(settings) {
  const {
    x = 0, z = -100, w = 10,
    imgH = 1920, imgW = 1080, img,
    sX = 0, sY = 0, sW = 1920, sH = 1080,
  } = settings;
  const canvasSize = 1024;
  const h = w * (sH / sW);
  createActor(scene, fps, {
    keys: [{t: 0, v: [x, 0, z]}],
    img,
    gw: w, gh: h, gd: 0.01, 
    cSz: canvasSize, cSc: canvasSize / Math.max(w, h), cOf: 0,
    iOfX: sX, iOfY: sY + sH, iSc: canvasSize / Math.max(sW, sH),
  });
}

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-50, 0, 50]}],
  // img: 'testimage3d.jpg',
  gw: 100, gh: 0.01, gd: 100,
  cSz: 1024, cSc: 1024 / 100, cOf: 0,
  // iOfX: 512, iOfY: 512, iSc: 1,
});

{ // N 1585 QUAI DES ORFEVRES - PALAIS DE JUSTICE
  const sX = 0, sY = 0, sW = 983, sH = 551, w = 50;
  createFacade({
    sX, sY, sW, sH, x: -60, z: -100, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-n-1585.jpg',
  });
}

{ // N 1579 QUAI DU MARCHÉ NEUF
  const sX = 803, sY = 237, sW = 1100, sH = 445, w = 60;
  createFacade({
    sX, sY, sW, sH, x: -10, z: -120, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-n-1579.jpg',
  });
}

{ // O 1583 HOEK
  // const width = 1920, height = 620, scale = 20;
  // createActor(scene, fps, {
  //   keys: [{t: 0, v: [-60, 0, -100]}],
  //   img: 'plstmichel/parijs-o-1583.jpg',
  //   gw: width / scale, gh: height / scale, gd: 0.1,
  //   cSz: 1024, cSc: 1024 / (width / scale), cOf: 0,
  //   iOfX: 0, iOfY: 660, iSc: 1,
  // });
}

// TEST
// createFacade({
//   imgH: 1024, imgW: 1024, img: 'testimage3d.jpg', sX: 0, sW: 512, sH: 512, z: -30,
// });

// CUBES
// for (let i = 0, n = 8; i < n; i++) {
//   createActor(scene, fps, {
//     keys: [{t: 0, v: [(Math.random() * 6) - 3, i * 0.75, (Math.random() * 6) - 3]}],
//     img: 'testimage3d.jpg',
//     gw: 0.5, gh: 0.5, gd: 0.5,
//     iOfX: 512, iOfY: 512, iSc: 0.5,
//   });
// }

export default scene;
