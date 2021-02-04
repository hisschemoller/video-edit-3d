

import { fps, getDefaultScene, } from './spui-shared.js';
import createActor from '../app/actor.js';

const scene = getDefaultScene([0,9999], 'hotdogs');

// HOTDOG 1
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 2, size: 512 },
  geom: { d: 0.01, path: [[0,1.54548],[0,1.6831],[0.09897,1.72113],[0.09897,1.97682],[1.2257,1.97682],[1.30442,1.51082],[1.73306,1.47508],[1.7636,1.14189],[1.52728,1.11102],[1.18091,0.43919],[1.20608,0.01474],[0,0]] },
  image: { file: 'spui/hotdog1.png', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [-2.1 + 1, 0, -3] }],
  rotateY: Math.PI / 4,
});

// HOTDOG 2
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 2.5, size: 512 },
  geom: { d: 0.01, path: [[1.70667,2.43858],[1.70667,0],[0.42217,0],[0.45059,1.3344],[0.53664,1.42455],[0.53664,1.58281],[0,1.56136],[0.05974,1.8822],[0.53663,1.98504],[0.53663,2.05472],[0.60884,2.05472],[0.60884,2.33267],[1.6036,2.45649]] },
  image: { file: 'spui/hotdog2.png', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [-3.1 + 1, -0.45, -4] }],
});

export default scene;
