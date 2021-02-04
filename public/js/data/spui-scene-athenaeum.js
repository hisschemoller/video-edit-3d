import { uuidv4, } from '../app/util.js';
import { fps, getDefaultScene, } from './spui-shared.js';
import createActor from '../app/actor.js';

const scene = getDefaultScene([0,9999], 'nzvbw');

// ATHENAEUM
createActor(scene, fps, {
  canvas: { offset: 256, scale: 512 / 24, size: 512 },
  geom: { w: 5, h: 14, d: 5 },
  image: { file: 'spui/athenaeum1.jpg', offx:200, offy: 2048, scale: 0.125 },
  keys: [{ t: 0, v: [ -10, 0, -35] }],
});

export default scene;
