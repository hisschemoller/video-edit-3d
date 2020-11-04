import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './spui-shared.js';
import createActor from '../app/actor.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const scene = {
  animations: [],
  canvases: {},
  clipId: uuidv4(),
  geometries: [],
  lifespan: [0,9999],
  materials: [
    {
      color: 0xffdd99,
      shininess: 0,
      specular: 0x050505,
      type: 'MeshPhongMaterial',
      uuid: 'default-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene1',
    uuid: 'scene1',
    children: [],
  },
  media: {},
};

// GROUND
createActor(scene, fps, {
  canvas: { offset: 0, scale: 1024 / 20, size: 1024 },
  geom: { w: 20, h: 20, d: 0.01 },
  image: { file: 'spui/spui-ground3.png', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-10, 0, 4] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

// ATHENAEUM
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 6, h: 6, d: 0.01 },
  // image: { offx: 0, offy: 1024, scale: 0.5 },
  image: { file: 'spui/athenaeum-1024.jpg', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [-9, 0, -12] }],
});

// ATHENAEUM ZIJ
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 4, h: 6, d: 0.01 },
  image: { file: 'spui/athenaeum-zij2-1024.jpg', offx: 290, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [-3, 0, -12] }],
  rotateY: Math.PI / 2,
});

// ABC VOOR
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 5, size: 512 },
  geom: { w: 5, h: 5, d: 0.01 },
  image: { file: 'spui/abc-voor.jpg', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [0, 0, -12] }],
});

// ABC ZIJ
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 5, size: 512 },
  geom: { w: 5, h: 5, d: 0.01 },
  image: { file: 'spui/abc-zij.png', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [0, 0, -17] }],
  rotateY: Math.PI / -2,
});

// NIEUWEZIJDS VOORBURGWAL
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 6, h: 5, d: 0.01 },
  image: { file: 'spui/nz-vbwal.png', offx: 100, offy: 1024 - 100, scale: 0.5 },
  keys: [{ t: 0, v: [-3, 0, -15.5] }],
});

// HOTDOG 1
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 2, size: 512 },
  geom: { d: 0.01, path: [[0,1.54548],[0,1.6831],[0.09897,1.72113],[0.09897,1.97682],[1.2257,1.97682],[1.30442,1.51082],[1.73306,1.47508],[1.7636,1.14189],[1.52728,1.11102],[1.18091,0.43919],[1.20608,0.01474],[0,0]] },
  image: { file: 'spui/hotdog1.png', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [-2.1, 0, -3] }],
  rotateY: Math.PI / 4,
});

// HOTDOG 2
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 2.5, size: 512 },
  geom: { d: 0.01, path: [[1.70667,2.43858],[1.70667,0],[0.42217,0],[0.45059,1.3344],[0.53664,1.42455],[0.53664,1.58281],[0,1.56136],[0.05974,1.8822],[0.53663,1.98504],[0.53663,2.05472],[0.60884,2.05472],[0.60884,2.33267],[1.6036,2.45649]] },
  image: { file: 'spui/hotdog2.png', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [-3.1, -0.45, -4] }],
});

// CUBES
// for (let i = 0, n = 5; i < n; i++) {
//   createActor(scene, fps, {
//     geom: { w: 0.5, h: 0.5, d: 0.5 },
//     keys: [{ t: 0, v: [Math.random() * 10 - 5, Math.random() * 3, Math.random() * 10 - 5] }],
//   });
// }

export default scene;