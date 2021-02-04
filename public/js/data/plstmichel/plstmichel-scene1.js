import { getDefaultScene, fps, } from './plstmichel-shared.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 180], 1, false);

function createFacade(settings) {
  const {
    x = 0, z = -100, w = 10,
    imgH = 1920, imgW = 1080, img,
    sX = 0, sY = 0, sW = 1920, sH = 1080,
    rotateY = 0,
  } = settings;
  const canvasSize = 1024;
  const h = w * (sH / sW);
  createActor(scene, fps, {
    keys: [{t: 0, v: [x, 0, z]}],
    geom: { w, h, d: 0.01, },
    canvas: { offset: 0, scale: canvasSize / Math.max(w, h), size: canvasSize },
    image: { file: img, offx: sX, offy: sY + sH, scale: canvasSize / Math.max(sW, sH) },
    rotateY,
  });
}

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-50, 0, 50]}],
  geom: { w: 100, h: 0.01, d: 100, },
  canvas: { offset: 0, scale: 1024 / 100, size: 1024 },
  image: { file: 'testimage3d.jpg', offx: 512, offy: 512, scale: 1 }, 
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
    sX, sY, sW, sH, x: 0, z: -120, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-n-1579.jpg',
  });
}

{ // O 1583 HOEK OOST MET SEINE
  const sX = 0, sY = 0, sW = 1920, sH = 620, w = 80;
  createFacade({
    sX, sY, sW, sH, x: -40, z: -99, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-o-1583.jpg', rotateY: Math.PI * -0.1,
  });
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
