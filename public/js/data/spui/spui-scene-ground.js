import { uuidv4, } from '../app/util.js';
import { fps, getDefaultScene, } from './spui-shared.js';
import createActor from '../app/actor.js';

const scene = getDefaultScene([0,9999], 'ground');

// GROUND FURTHER EVEN
createActor(scene, fps, {
  canvas: { offset: 0, scale: 1024 / 20, size: 1024 },
  geom: { w: 20, h: 20, d: 0.01 },
  image: { file: 'spui/spui-ground3.png', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-10, 0, 4 - 40] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

// GROUND FURTHER
createActor(scene, fps, {
  canvas: { offset: 0, scale: 1024 / 20, size: 1024 },
  geom: { w: 20, h: 20, d: 0.01 },
  image: { file: 'spui/spui-ground3.png', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-10, 0, 4 - 20] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

// GROUND FOREGROUND
createActor(scene, fps, {
  canvas: { offset: 0, scale: 1024 / 20, size: 1024 },
  geom: { w: 20, h: 20, d: 0.01 },
  image: { file: 'spui/spui-ground3.png', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-10, 0, 4] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

export default scene;
