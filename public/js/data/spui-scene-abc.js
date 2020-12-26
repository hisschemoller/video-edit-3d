import { uuidv4, } from '../app/util.js';
import { fps, getDefaultScene, } from './spui-shared.js';
import createActor from '../app/actor.js';

const scene = getDefaultScene([0,9999], 'nzvbw');

// ABC
createActor(scene, fps, {
  canvas: { offset: 256, scale: 512 / 20, size: 512 },
  geom: { w: 5, h: 10, d: 5 },
  image: { file: 'spui/abc2.jpg', offx: 1024, offy: 2048, scale: 0.125 },
  keys: [{ t: 0, v: [ 2.8, 0, -40] }],
});

export default scene;
