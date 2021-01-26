import { getDefaultScene, fps, } from './plstmichel-shared.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 180], 1, false);

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-50, 0, 50]}],
  // img: 'testimage3d.jpg',
  gw: 100, gh: 0.01, gd: 100,
  cSz: 1024, cSc: 1024 / 100, cOf: 0,
  // iOfX: 512, iOfY: 512, iSc: 1,
});

{ // NORTH
  const width = 25;
  createActor(scene, fps, {
    keys: [{t: 0, v: [-30, 0, -40]}],
    img: 'plstmichel/parijs-n-1585.jpg',
    gw: width, gh: 25, gd: 0.1,
    cSz: 1024, cSc: 1024 / width, cOf: 0,
    iOfX: 0, iOfY: 710, iSc: 1.2,
  });
}

{ // NORTH
  const width = 50;
  createActor(scene, fps, {
    keys: [{t: 0, v: [-10, 0, -50]}],
    img: 'plstmichel/parijs-n-1579.jpg',
    gw: width, gh: 18, gd: 0.1,
    cSz: 1024, cSc: 1024 / width, cOf: 0,
    iOfX: 600, iOfY: 700, iSc: 0.7,
  });
}


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
