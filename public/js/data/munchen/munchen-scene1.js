import { getDefaultScene, fps, } from './munchen-shared.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 180], 1, false);

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-1, 0, 4]}],
  img: 'testimage3d.jpg',
  gw: 5, gh: 0.01, gd: 5,
  cSz: 1024, cSc: 1024 / 5, cOf: 0,
  iOfX: 512, iOfY: 512, iSc: 2,
});

for (let i = 0, n = 8; i < n; i++) {

  // CUBE
  createActor(scene, fps, {
    keys: [{t: 0, v: [(Math.random() * 6) - 3, i * 0.75, (Math.random() * 6) - 3]}],
    img: 'testimage3d.jpg',
    gw: 0.5, gh: 0.5, gd: 0.5,
    iOfX: 512, iOfY: 512, iSc: 0.5,
  });
}

export default scene;
