import { uuidv4, } from '../app/util.js';
import { fps, getDefaultScene, } from './spui-shared.js';
import createActor from '../app/actor.js';

const scene = getDefaultScene([0,9999], 'nzvbw');

// NIEUWEZIJDS VOORBURGWAL
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 15, size: 512 },
  geom: { w: 15, h: 15, d: 0.01 },
  image: { file: 'spui/nz-vbwal2.jpg', offx: 0, offy: 2048, scale: 0.25 },
  keys: [{ t: 0, v: [-10, -2, -60] }],
});

export default scene;
