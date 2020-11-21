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
  assets: {},
};

// GROUND
createActor(scene, fps, {
  canvas: { offset: 0, scale: 1024 / 20, size: 1024 },
  geom: { w: 15.5, h: 26, d: 0.01 },
  image: { file: 'spui/spui-ground3.png', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-8, 0, 6] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

// SCHADUW VOOR
createActor(scene, fps, {
  // geom: { w: 6, h: 5.0, d: 0.01 },
  geom: { d: 0.01, path: [
    [ 0  , 0],
    [ 0  , 3],  
    [ 0.6, 1],
    [ 0.6, 3],
    [ 1  , 5],
    [ 3  , 5],
    [ 3.6, 2.5],
    [ 3.6, 3],
    [ 4  , 5],
    [ 6  , 5],
    [ 6  , 0]
  ]},
  keys: [{ t: 0, v: [1.5, 0, 2.5] }],
  rotateY: Math.PI / -2,
});

// ATHENAEUM
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 6, h: 6, d: 0.01 },
  // image: { offx: 0, offy: 1024, scale: 0.5 },
  image: { file: 'spui/athenaeum2-1024.jpg', offx: 235, offy: 1024, scale: 0.65 },
  keys: [{ t: 0, v: [-8, 0, -10] }],
});

// ATHENAEUM ZIJ
createActor(scene, fps, {
  canvas: { offset: 0, scale: 512 / 6, size: 512 },
  geom: { w: 5.5, h: 5.5, d: 0.01 },
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


/**
 * All data.
 */
const data = {
  settings: {
    backgroundImage: null, // 'spui/nz-vbwal2-1024.jpg',
    backgroundVideoResourceId: 'mkp_preview', // '30seconds',
    backgroundVideoStartTime: 5,
    backgroundVideoEndTime: 300,
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
  gltfFiles: [],
  resources: [
    {
      id: 'mkp_preview',
      url: 'frames/mkp_preview/frame_#.png',
      frames: 16906,
      fps: 30,
      width: 480,
      height: 270,
    },
  ],
  score: [
    scene,
  ],
};

export default data;
