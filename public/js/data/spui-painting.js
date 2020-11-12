import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import { fps, } from './spui-shared.js';
import createActor from '../app/actor.js';

const ppqn = 24; // parts per quarter note
const bpm = 112; // beats per minute
const timeSignatureNumerator = 4; // number of beats in a measure
const timeSignatureDenominator = 4; // length of a beat (4 = quarter note, 8 = eight note)

setTiming(bpm, ppqn, timeSignatureNumerator, timeSignatureDenominator);

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
  geom: { w: 15.5, h: 25, d: 0.01 },
  image: { file: 'spui/spui-ground3.png', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-8, 0, 4] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

// ATHENAEUM
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 6, h: 6, d: 0.01 },
  // image: { offx: 0, offy: 1024, scale: 0.5 },
  image: { file: 'spui/athenaeum-1024.jpg', offx: 235, offy: 1024, scale: 0.65 },
  keys: [{ t: 0, v: [-8, 0, -10] }],
});

// ATHENAEUM ZIJ
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 5.5, h: 6, d: 0.01 },
  image: { file: 'spui/athenaeum-zij3-1024.jpg', offx: 70, offy: 1024 - 120, scale: 0.50  },
  keys: [{ t: 0, v: [-2, 0, -10] }],
  rotateY: Math.PI / 2,
});

// NIEUWEZIJDS LINKS
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 4.5, h: 3, d: 0.01 },
  image: { file: 'spui/nz-vbwal-zij-1024.jpg', offx: 0, offy: 1024, scale: 0.4 },
  keys: [{ t: 0, v: [-2, 0, -15.5] }],
  rotateY: Math.PI / 2,
});

// NIEUWEZIJDS VOORBURGWAL
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 3, h: 2.5, d: 0.01 },
  image: { file: 'spui/nz-vbwal4.jpg', offx: 0, offy: 1024 - 150, scale: 0.4 },
  keys: [{ t: 0, v: [-2, 0, -20] }],
});

// NIEUWEZIJDS RECHTS
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 4.5, h: 3.0, d: 0.01 },
  image: { file: 'spui/nz-vbwal.png', offx: 100, offy: 1024 - 100, scale: 0.45 },
  keys: [{ t: 0, v: [1, 0, -20] }],
  rotateY: Math.PI / -2,
});

// ABC TWEEDE GEBOUW
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 1.5, h: 3.0, d: 0.01 },
  image: { file: 'spui/nz-vbwal.png', offx: 600, offy: 1024 - 100, scale: 0.45 },
  keys: [{ t: 0, v: [1, 0, -15.5] }],
});

// ABC ZIJ
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 5, size: 512 },
  geom: { w: 3.5, h: 4.0, d: 0.01 },
  image: { file: 'spui/abc-zij.png', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [2.5, 0, -15.5] }],
  rotateY: Math.PI / -2,
});

// ABC VOOR
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 5, size: 512 },
  geom: { w: 5, h: 4.0, d: 0.01 },
  image: { file: 'spui/abc-voor.jpg', offx: 0, offy: 1024, scale: 0.5 },
  keys: [{ t: 0, v: [2.5, 0, -12] }],
});

// HOTDOG 1
// createActor(scene, fps, {
//   canvas: { offset: 0, scale: 512 / 2, size: 512 },
//   geom: { d: 0.01, path: [[0,1.54548],[0,1.6831],[0.09897,1.72113],[0.09897,1.97682],[1.2257,1.97682],[1.30442,1.51082],[1.73306,1.47508],[1.7636,1.14189],[1.52728,1.11102],[1.18091,0.43919],[1.20608,0.01474],[0,0]] },
//   image: { file: 'spui/hotdog1.png', offx: 0, offy: 1024, scale: 0.5 },
//   keys: [{ t: 0, v: [-2.1, 0, -3] }],
//   rotateY: Math.PI / 4,
// });

// HOTDOG 2
// createActor(scene, fps, {
//   canvas: { offset: 0, scale: 512 / 2.5, size: 512 },
//   geom: { d: 0.01, path: [[1.70667,2.43858],[1.70667,0],[0.42217,0],[0.45059,1.3344],[0.53664,1.42455],[0.53664,1.58281],[0,1.56136],[0.05974,1.8822],[0.53663,1.98504],[0.53663,2.05472],[0.60884,2.05472],[0.60884,2.33267],[1.6036,2.45649]] },
//   image: { file: 'spui/hotdog2.png', offx: 0, offy: 1024, scale: 0.5 },
//   keys: [{ t: 0, v: [-3.1, -0.45, -4] }],
// });

// CUBES
// for (let i = 0, n = 5; i < n; i++) {
//   createActor(scene, fps, {
//     geom: { w: 0.5, h: 0.5, d: 0.5 },
//     keys: [{ t: 0, v: [Math.random() * 10 - 5, Math.random() * 3, Math.random() * 10 - 5] }],
//   });
// }


/**
 * All data.
 */
const data = {
  settings: {
    backgroundImage: null,
    width: 45 * 15,
    height: 55 * 15,
    fps,
    ppqn,
    bpm,
    timesignature: {
      numerator: timeSignatureNumerator,
      denominator: timeSignatureDenominator,
    },
  },
  camera: {
    speed: 0,
    fieldOfView: 18,
    position: [0, 1, 12],
    target: [0, 1, 0],
  },
  resources: [],
  score: [
    scene,
  ],
};

export default data;