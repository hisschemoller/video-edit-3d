import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';
import createActor from '../app/actor.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const videoScene4 = {
  resourceId: 'leidseplein4',
  start: 20,
  end: 146,
  isLoop: true,
  keys: [
    {
      time: 0,
      value: [0, 480],
    },
  ],
  scale: 1,
};

const defaultMesh = {
  castShadow: true,
  geometry: 's4w1-geom',
  layers: 1,
  material: 'default-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0,0,0,1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 's4-obj',
};

const start = fps * 30;

const wall1Pos = [0, 0, 0];
const backdropPos = [-5, 0, -120];
const concertPos = [-21, 0, -60];
const modernePos = [19, 0, -90];
const maisonPos = [1, 0, -110];
const treePos = [-4.8, 0, -11.5];
const polerightPos = [5.5, 0, -15];
const polemiddlePos = [2, 0, -21];
const polemidrightPos = [5, 0, -27];
const couplePos = [0, 0, -5];

const scene = {
  animations: [
    {
      duration: 80 * fps,
      fps,
      loop: THREE.LoopOnce,
      name: 'actor-animation',
      tracks: [
      ],
    },
  ],
  canvases: {
    's4g-canvas': {
      offsetX: 0,
      offsetY: 0,
      scale: 1024 / 40,
      width: 1024,
      height: 1024,
      imageId: 's4-ground-image',
    },
    's4-backdrop-canvas': {
      ...canvas,
      offsetX: 0,
      offsetY: 0,
      scale: 9,
      videoId: 's4-backdrop-video',
    },
    's4-concert-canvas': {
      ...canvas,
      offsetX: 0,
      offsetY: 310,
      scale: 9,
      videoId: 's4-concert-video',
    },
    's4-moderne-canvas': {
      ...canvas,
      scale: 10,
      videoId: 's4-moderne-video',
    },
    's4-maison-canvas': {
      ...canvas,
      scale: 11,
      videoId: 's4-maison-video',
    },
    's4-tree-canvas': {
      ...canvas,
      scale: 256 / 5.4,
      videoId: 's4-tree-video',
    },
    's4-poleright-canvas': {
      ...canvas,
      scale: 256 / 8,
      imageId: 's4-poleright-image',
    },
    's4-polemiddle-canvas': {
      ...canvas,
      scale: 256 / 8,
      imageId: 's4-polemiddle-image',
    },
    's4-polemidright-canvas': {
      ...canvas,
      scale: 256 / 9,
      imageId: 's4-polemidright-image',
    },
  },
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [40, 0], [40, 40], [0, 40] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 's4g-geom',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [30, 0], [30, 8], [0, 8] ],
      uuid: 's4-backdrop-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 20,
      points: [ [0, 0], [18, 0], [18, 15], [0, 15] ],
      uuid: 's4-concert-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 10,
      points: [ [0, 0], [12, 0], [12, 16], [0, 16] ],
      uuid: 's4-moderne-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 10,
      points: [ [0, 0], [18, 0], [18, 16], [0, 16] ],
      uuid: 's4-maison-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.1,
      points: [[0.86298,0.02332],[0.81418,3.27506],[0.86298,3.35509],[0.86298,4.4781],[0,4.4781],[0,5.4],[3.96109,5.4],[3.96109,4.4781],[1.03461,4.4781],[1.03461,3.35509],[1.09049,3.19879],[1.15752,0.02332],[0.97002,0]],
      uuid: 's4-tree-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.1,
      points: [[0.04889,0],[0.04889,2.2421],[0.07449,2.31998],[0.04889,3.78301],[0.04889,3.87636],[0,5.25286],[0.02074,5.29285],[0,6],[0.04889,6],[0.07449,5.29285],[0.09636,5.25286],[0.1446,3.80425],[0.1829,3.69366],[0.1829,2.31998],[0.22207,2.2421],[0.26663,0]],
      uuid: 's4-poleright-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.1,
      points: [[0.06386,0.00014],[0.10904,2.74676],[0.15328,5.81283],[0,5.81283],[0.06752,6.09602],[0.27474,6.01544],[0.29714,2.74671],[0.29714,0.83086],[0.35994,0.83086],[0.39481,0]],
      uuid: 's4-polemiddle-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.1,
      points: [[0.29803,0],[0.25573,6.19846],[0.12383,6.19846],[0,6.59504],[0.25586,6.66195],[0.25586,7.20799],[0.32601,7.20799],[0.32601,6.85526],[0.63045,6.90784],[0.68259,6.82084],[0.35286,6.37607],[0.5868,0]],
      uuid: 's4-polemidright-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [120, 220],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 's4g-mat',
    },
    {
      color: 0xffdd99,
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
    name: 'scene4',
    uuid: 'scene4',
    children: [
      {
        // GROUND
        canvasId: 's4g-canvas',
        castShadow: false,
        geometry: 's4g-geom',
        layers: 1,
        material: 's4g-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -20,0,-11,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 's4g-obj',
      },
      {
        // ACHTERWAND
        ...defaultMesh,
        canvasId: 's4-backdrop-canvas',
        geometry: 's4-backdrop-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...backdropPos, 1],
        name: 's4-backdrop-obj', 
      },
      {
        // CONCERTGEBOUW
        ...defaultMesh,
        canvasId: 's4-concert-canvas',
        geometry: 's4-concert-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...concertPos, 1],
        name: 's4-concert-obj', 
      },
      {
        // CAFE MODERNE / HEINEKENHOEK
        ...defaultMesh,
        canvasId: 's4-moderne-canvas',
        geometry: 's4-moderne-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...modernePos, 1],
        name: 's4-moderne-obj',
      },
      {
        // MAISON DE VRIES
        ...defaultMesh,
        canvasId: 's4-maison-canvas',
        geometry: 's4-maison-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...maisonPos, 1],
        name: 's4-maison-obj',
      },
      {
        // TREE
        ...defaultMesh,
        canvasId: 's4-tree-canvas',
        geometry: 's4-tree-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...treePos, 1],
        name: 's4-tree-obj',
      },
      {
        // POLE_RIGHT
        ...defaultMesh,
        canvasId: 's4-poleright-canvas',
        geometry: 's4-poleright-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...polerightPos, 1],
        name: 's4-poleright-obj',
      },
      {
        // POLE_MIDDLE
        ...defaultMesh,
        canvasId: 's4-polemiddle-canvas',
        geometry: 's4-polemiddle-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...polemiddlePos, 1],
        name: 's4-polemiddle-obj',
      },
      {
        // POLE_MIDRIGHT
        ...defaultMesh,
        canvasId: 's4-polemidright-canvas',
        geometry: 's4-polemidright-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...polemidrightPos, 1],
        name: 's4-polemidright-obj',
      },
    ],
  },
  videos: {
    's4-ground-image': {
      file: 'leidseplein-ground.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
    },
    's4-backdrop-video': {
      ...videoScene4,
      keys: [ { ...videoScene4.keys[0], value: [ 290, 480 - 200 ] } ],
      scale: 0.80,
    },
    's4-concert-video': {
      ...videoScene4,
      keys: [ { ...videoScene4.keys[0], value: [ 0, 480 - 200 ] } ],
      scale: 0.58,
    },
    's4-moderne-video': {
      ...videoScene4,
      keys: [ { ...videoScene4.keys[0], value: [ 520, 480 - 210 ] } ],
      scale: 0.9,
    },
    's4-maison-video': {
      ...videoScene4,
      keys: [ { ...videoScene4.keys[0], value: [ 330, 480 - 210 ] } ],
      scale: 1.15,
    },
    's4-tree-video': {
      ...videoScene4,
      keys: [ { ...videoScene4.keys[0], value: [ 0, 342 ] } ],
      scale: 256 / 342, // (256 / 4.8)
    },
    's4-poleright-image': {
      file: 'leidseplein-scene-4.jpg',
      offsetX: 589,
      offsetY: 295,
      scale: 256 / 295,
    },
    's4-polemiddle-image': {
      file: 'leidseplein-scene-4.jpg',
      offsetX: 385,
      offsetY: 288,
      scale: 256 / 288,
    },
    's4-polemidright-image': {
      file: 'leidseplein-scene-4.jpg',
      offsetX: 501.5,
      offsetY: 280,
      scale: 256 / 280,
    },
    'test3d-image': {
      file: 'testimage3d.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
    },
  },
};

let actorStart;

// TIMER
// createActor(scene, fps, {
//   gw: 640 / 360,
//   keys: [
//     { t: 2, v: [  -3, 0, -11]},
//     { t: 3, v: [ -4, 0, -11]},
//   ],
//   cSc: 256 / (640 / 360),
//   vKeys: [
//     { t: 0, v: [  0, 360]},
//   ],
//   vSc: 256 / 640, vt: [0, null], vrid: '30seconds',
// });

// VROUW VAN VER WEG
createActor(scene, fps, {
  gw: 2, gh: 2.2,
  keys: [
    { t:  0, v: [  0, 0, -110]},
    { t: 46, v: [  -1, 0,  -5]},
    { t: 49, v: [ -5, 0,  -3]},
  ],
  cSc: 80, cOf: 0,
  vSc: 1, 
  vt: [60, 60 + 50],
  vKeys: [
    { t:  0, v: [ 240, 380]},
    { t: 46, v: [ 240, 400]},
    { t: 49, v: [   0, 400]},
  ],
  vrid: 'leidseplein3b',
});

// VOETGANGER MET WITTE TRUI
actorStart = 2;
createActor(scene, fps, {
  gw: 2.5, gh: 2.5,
  keys: [
    { t:  0 + actorStart, v: [-11, 0, -20]},
    { t: 11 + actorStart, v: [  9, 0, -20]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2, 
  vt: [19.9, 20 + 11],
  vKeys: [
    { t:  0 + actorStart, v: [  0, 340]},
    { t: 11 + actorStart, v: [640, 340]},
  ],
  vrid: 'leidseplein4',
});

// SCOOTER
actorStart = 10;
createActor(scene, fps, {
  gw: 2, gh: 2,
  keys: [
    { t:   0 + actorStart, v: [  8, 0, -18]},
    { t: 7.2 + actorStart, v: [-10, 0, -18]},
  ],
  cSc: 70, cOf: 0,
  vSc: 2,
  vt: [ 6, 6 + 8 ],
  vKeys: [
    { t:   0 + actorStart, v: [ 640, 300]},
    { t: 7.2 + actorStart, v: [   0, 300]},
  ],
  vrid: 'leidseplein3b',
});

// INVALIDENWAGENTJE
actorStart = 15;
createActor(scene, fps, {
  gw: 4, gh: 3,
  keys: [
    { t:   0 + actorStart, v: [ -16, 0, -30]},
    { t: 5.5 + actorStart, v: [ 4, 0, -30]},
    { t:  11 + actorStart, v: [ 12, 0, -30]},
  ],
  cSc: 80, cOf: 0,
  vSc: 4, 
  vt: [68.4, 68 + 12],
  vKeys: [
    { t:   0 + actorStart, v: [  0, 290]},
    { t: 5.0 + actorStart, v: [480, 290]},
    { t:  11 + actorStart, v: [700, 290]},
  ],
  vrid: 'leidseplein3b',
});

// DRIE VROUWEN VAN RECHTS
actorStart = 20;
createActor(scene, fps, {
  gw: 1.5, gh: 2.5,
  keys: [
    { t:  0 + actorStart, v: [  6.5, 0,  -12]},
    { t:  8 + actorStart, v: [    0, 0,  -12]},
    { t: 14 + actorStart, v: [   -3, 0,  -15]},
    { t: 20 + actorStart, v: [   -3, 0,  -15]},
    { t: 50 + actorStart, v: [   -3, 0, -120]},
  ],
  cSc: 80, cOf: 0,
  vt: [45.5, 45 + 50], vSc: 1.3,
  vKeys: [
    { t:  0 + actorStart, v: [640, 380]},
    { t:  8 + actorStart, v: [200, 380]},
    { t: 14 + actorStart, v: [ 60, 380]},
    { t: 20 + actorStart, v: [ 60, 380]},
  ],
  vrid: 'leidseplein4',
});

// VROUW WIJDE BROEK
actorStart = 25;
createActor(scene, fps, {
  gw: 2.2, gh: 2.2,
  keys: [
    { t:  0 + actorStart, v: [ -9, 0, -13]},
    { t: 16 + actorStart, v: [ 8, 0, -13]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2, 
  vt: [ 44, 44 + 17 ],
  vKeys: [
    { t:  0 + actorStart, v: [  0, 320]},
    { t: 16 + actorStart, v: [640, 320]},
  ],
  vrid: 'leidseplein3b',
});

// FIETSER
actorStart = 30;
createActor(scene, fps, {
  gw: 5, gh: 3,
  keys: [
    { t:   0 + actorStart, v: [-20, 0, -30]}, // time measures in seconds
    { t: 5.5 + actorStart, v: [ 12, 0, -30]},
  ],
  cSc: 50, cOf: 0,
  vSc: 2,
  vt: [17.5, 17.5 + 5.5], vt0i: 17.5, // measured in seconds
  vKeys: [
    { t:   0 + actorStart, v: [  0, 313]}, // measured in seconds
    { t: 5.5 + actorStart, v: [640, 313]}, // measured in seconds
  ],
  vrid: 'leidseplein4',
});

// MAN BLAUW T-SHIRT
actorStart = 40;
createActor(scene, fps, {
  gw: 1.2, gh: 2,
  keys: [
    { t:  0 + actorStart, v: [  6.5, 0, -12]},
    { t: 14 + actorStart, v: [ -9,   0, -16]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2,
  vt: [ 80.5, 80 + 18 ],
  vKeys: [
    { t:  0 + actorStart, v: [ 640, 315]},
    { t:  9 + actorStart, v: [ 160, 315]},
    { t: 18 + actorStart, v: [ -80, 315]},
  ],
  vrid: 'leidseplein3b',
});

// ECHTPAAR MET TASJE
actorStart = 48;
createActor(scene, fps, {
  gh: 2.5, gw: 3,
  keys: [
    { t:  0 + actorStart, v: [ 6, 0, -11]},
    { t:  5 + actorStart, v: [ 0, 0, -11]},
    { t: 24.5 + actorStart, v: [ 0, 0, -11]},
    { t: 34 + actorStart, v: [-5, 0, -15]},
    { t: 40 + actorStart, v: [-5, 0, -15]},
    { t: 60 + actorStart, v: [-10, 0, -85]},
  ],
  cSc: 256 / 3,
  vKeys: [
    { t:  0 + actorStart, v: [ 540, 200]},
    { t:  5 + actorStart, v: [ 140, 200]},
    { t: 24.5 + actorStart, v: [ 140, 200]},
    { t: 34 + actorStart, v: [   0, 180]},
    { t: 40 + actorStart, v: [   0, 180]},
    { t: 60 + actorStart, v: [ -30, 180]},
  ],
  vSc: 265 / 200, vt: [0, 60], vrid: 'couple',
});

// FIETSER MET WITTE TAS
actorStart = 55;
createActor(scene, fps, {
  gw: 4, gh: 3.3,
  keys: [
    { t: 0 + actorStart, v: [-15, 0, -29]}, // time measures in seconds
    { t: 7 + actorStart, v: [ 13, 0, -34]},
  ],
  cSc: 50, cOf: 0,
  vSc: 2,
  vt: [33.9, 34 + 8], // measured in seconds
  vKeys: [
    { t: 0 + actorStart, v: [  0, 313]}, // measured in seconds
    { t: 3 + actorStart, v: [400, 313]}, // measured in seconds
    { t: 6.5 + actorStart, v: [640, 313]}, // measured in seconds
  ],
  vrid: 'leidseplein4',
});

// WIT BUSJE
actorStart = 62;
createActor(scene, fps, {
  gw: 7, gh: 3.3,
  keys: [
    { t:  0 + actorStart, v: [ 20, 0, -30]},
    { t: 12 + actorStart, v: [-23, 0, -45]},
  ],
  cSc: 70, cOf: 0,
  vSc: 2.5,
  vt: [21, 21 + 12],
  vKeys: [
    { t:  0 + actorStart,  v: [ 640, 310]},
    { t: 12 + actorStart, v: [   0, 310]},
  ],
  vrid: 'leidseplein4',
});

// TOERISTENFIETS
actorStart = 66;
createActor(scene, fps, {
  gw: 3.5, gh: 3,
  keys: [
    { t:  0 + actorStart, v: [-14, 0, -25]},
    { t: 8.8 + actorStart, v: [ 10, 0, -25]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2.3, 
  vt: [ 47.7, 48 + 9 ],
  vKeys: [
    { t:  0   + actorStart, v: [   0, 320]},
    { t: 4.2   + actorStart, v: [   400, 320]},
    { t: 8.8   + actorStart, v: [ 640, 320]},
  ],
  vrid: 'leidseplein4',
});

// MAN BELLEND ROOD T-SHIRT
actorStart = 71;
createActor(scene, fps, {
  gw: 2.2, gh: 2.2,
  keys: [
    { t:  0 + actorStart, v: [-12, 0, -24]},
    { t: 16 + actorStart, v: [ 12, 0, -18]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2, 
  vt: [ 76.8, 77 + 16 ],
  vKeys: [
    { t:  0 + actorStart, v: [  0, 320]},
    { t: 16 + actorStart, v: [640, 320]},
  ],
  vrid: 'leidseplein3b',
});

// SCOOTER ROOD SHIRT
actorStart = 75;
createActor(scene, fps, {
  gw: 2.5, gh: 2.5,
  keys: [
    { t: 0 + actorStart, v: [-11, 0, -18]},
    { t: 6 + actorStart, v: [ 10, 0, -15]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2.2,
  vt: [ 20.8, 21 + 6 ],
  vKeys: [
    { t:  0 + actorStart, v: [   0, 320]},
    { t:  3.1 + actorStart, v: [ 360, 320]},
    { t:  6.0 + actorStart, v: [ 840, 320]},
  ],
  vrid: 'leidseplein4',
});

// GROEPJE
actorStart = 80;
createActor(scene, fps, {
  gw: 3, gh: 2.5,
  keys: [
    { t:  0 + actorStart, v: [ 8, 0, -15]},
    { t: 14 + actorStart, v: [-5, 0, -9]},
    { t: 17 + actorStart, v: [-8, 0, -9]},
  ],
  cSc: 70, cOf: 0,
  vSc: 2.0,
  vt: [2, 19],
  vKeys: [
    { t:  0 + actorStart,  v: [ 640, 320]},
    { t: 9 + actorStart, v: [   200, 320]},
    { t: 14 + actorStart, v: [   0, 320]},
    { t: 17 + actorStart, v: [   -100, 320]},
  ],
  vrid: 'leidseplein3a',
});

// GELE BAKFIETS
actorStart = 83;
createActor(scene, fps, {
  gw: 2.2, gh: 2.2,
  keys: [
    { t:  0 + actorStart, v: [-12, 0, -21]},
    { t: 14 + actorStart, v: [ 12, 0, -21]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2.5, 
  vt: [ 89, 89 + 14 ],
  vKeys: [
    { t:  0   + actorStart, v: [   0, 300]},
    { t:  4.5 + actorStart, v: [ 350, 300]},
    { t:  9   + actorStart, v: [ 550, 300]},
    { t: 14   + actorStart, v: [ 640, 300]},
  ],
  vrid: 'leidseplein3a',
});

// POLITIE
actorStart = 93;
createActor(scene, fps, {
  gw: 5, gh: 2.5,
  keys: [
    { t: 0 + actorStart, v: [-15, 0, -25]},
    { t: 4 + actorStart, v: [  8, 0, -5]},
  ],
  cSc: 80, cOf: 0,
  vSc: 2, 
  vt: [7.7, 8 + 4],
  vKeys: [
    { t: 0 + actorStart, v: [  -150, 340]},
    { t: 4 + actorStart, v: [740, 340]},
  ],
  vrid: 'leidseplein4',
});

// TRAM
// actorStart = 0;
// createActor(scene, fps, {
//   gw: 16, gh: 4,
//   keys: [
//     { t:  0 + actorStart, v: [ 20, 0, -61]},
//     { t: 17 + actorStart, v: [-4, 0, -61]},
//     { t: 26 + actorStart, v: [-40, 0, -61]},
//   ],
//   cSc: 30, cOf: 0,
//   vSc: 0.9,
//   vt: [ 35, 34 + 17 ],
//   vKeys: [
//     { t:  0 + actorStart,  v: [ 640, 300]},
//     { t: 17 + actorStart, v: [   -200, 300]},
//     { t: 26 + actorStart, v: [   -200, 300]},
//   ],
//   vrid: 'leidseplein3b',
// });


// VROUW MET KRUK
// createActor(scene, fps, {
//   gw: 1.5, gh: 2.2,
//   keys: [
//     { t:  0, v: [ -12, 0, -40]},
//     { t: 38, v: [  -5, 0,  -8]},
//     { t: 46, v: [   6, 0,  -8]},
//   ],
//   cSc: 80, cOf: 0,
//   vSc: 1, 
//   vt: [20],
//   vKeys: [
//     { t:  0, v: [ 10, 400]},
//     { t: 38, v: [ 10, 400]},
//     { t: 46, v: [   0, 400]},
//   ],
//   vrid: 'leidseplein3b',
// });


export default scene;
