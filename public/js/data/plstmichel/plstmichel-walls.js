import { getDefaultScene, fps, } from './plstmichel-shared.js';
import createCamera from './plstmichel-camera.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 180], 1, true);

createCamera(scene);

/**
 * Create a building facade, which is a very thin box.
 * @param {Object} settings
 */
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
  canvas: { offset: 0, scale: 2048 / 100, size: 2048 },
  image: { file: 'plstmichel/plstmichel-grond.jpg', offx: 0, offy: 2048, scale: 1 }, 
});

{ // N 1585 QUAI DES ORFEVRES - PALAIS DE JUSTICE
  const sX = 0, sY = 0, sW = 983, sH = 551, w = 50;
  createFacade({
    sX, sY, sW, sH, x: -50, z: -50, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-n-1585.jpg',
    // img: 'fs-img?dir=/Volumes/Seagate Slim Drive/testfoto/parijs/&img=parijs-n.jpg',
    // img: 'fs-img?dir=/Users/wouter/Pictures/&img=parijs-test.jpg',
    // img: 'fs-img?dir=iets&img=anders',
  });
}

{ // N 1579 QUAI DU MARCHÉ NEUF
  const sX = 803, sY = 237, sW = 1100, sH = 445, w = 60;
  createFacade({
    sX, sY, sW, sH, x: -5, z: -60, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-n-1579.jpg',
  });
}

{ // O 1583 HOEK OOST MET SEINE
  const sX = 0, sY = 0, sW = 1920, sH = 620, w = 80;
  createFacade({
    sX, sY, sW, sH, x: -50, z: 30, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-o-1583.jpg', rotateY: Math.PI * 0.5,
  });
}

{ // O 1584 OOST POORT
  const sX = 0, sY = 0, sW = 845, sH = 691, w = 30;
  createFacade({
    sX, sY, sW, sH, x: -30, z: 50, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-o-1584.jpg', rotateY: Math.PI * 0.5,
  });
}

{ // O 1584 OOST BUSHALTE
  const sX = 845, sY = 0, sW = 714, sH = 691, w = 20;
  createFacade({
    sX, sY, sW, sH, x: -30, z: 20, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-o-1584.jpg', rotateY: Math.PI,
  });
}

{ // Z 1581 FONTEIN
  const sX = 4, sY = 17, sW = 1910, sH = 636, w = 80;
  createFacade({
    sX, sY, sW, sH, x: 50, z: 50, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-z-1581.jpg', rotateY: Math.PI,
  });
}

{ // W 1600 GILBERT JEUNE
  const sX = 777, sY = 0, sW = 760, sH = 665, w = 40;
  createFacade({
    sX, sY, sW, sH, x: 50, z: 10, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-w-1600.jpg', rotateY: Math.PI * -0.5,
  });
}

{ // W 1582 RUE DE LA HUCHETTE
  const sX = 376, sY = 0, sW = 1025, sH = 710, w = 40;
  createFacade({
    sX, sY, sW, sH, x: 50, z: -30, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-w-1582.jpg', rotateY: Math.PI * -0.5,
  });
}

{ // W 1628 QUAI SAINT MICHEL
  const sX = 900, sY = 0, sW = 509, sH = 767, w = 20;
  createFacade({
    sX, sY, sW, sH, x: 50, z: -50, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-w-1628.jpg', rotateY: Math.PI * -0.5,
  });
}

{ // W 1628 NOTRE DAME
  const sX = 3, sY = 9, sW = 898, sH = 758, w = 30;
  createFacade({
    sX, sY, sW, sH, x: 20, z: -50, w, h: w * (sH / sW),
    img: 'plstmichel/parijs-w-1628.jpg',
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
