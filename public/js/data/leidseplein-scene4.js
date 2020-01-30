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
      duration: 90,
      fps,
      loop: THREE.LoopOnce,
      name: 'actor-animation',
      tracks: [
        {
          interpolation: THREE.InterpolateSmooth,
          name: `s4-couple-obj.position`,
          type: 'vector3',
          keys: [
            {
              value: [ ...couplePos ], // in 3d units
              time: 0 * fps, // in frames
            },
            {
              value: [ ...couplePos ],
              time: 4 * fps,
            },
            {
              value: [ ...couplePos ],
              time: 7 * fps,
            },
            {
              value: [ ...couplePos ],
              time: 17 * fps,
            },
          ],
        },
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
    's4-couple-canvas': {
      ...canvas,
      scale: 256 / 2.2,
      videoId: 's4-couple-video',
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
    {
      depth: 10,
      points: [ [0, 0], [2, 0], [2, 2.2], [0, 2.2] ],
      uuid: 's4-couple-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [120, 200],
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
      {
        // COUPLE WITH BAG
        ...defaultMesh,
        canvasId: 's4-couple-canvas',
        geometry: 's4-couple-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...couplePos, 1],
        name: 's4-couple-obj',
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
    's4-couple-video': {
      ...videoScene4,
      resourceId: 'leidseplein3a',
      start: 130.5,
      end: 130.5 + 4,
      // offsetX: 640,
      // offsetY: 400,
      // offsetX2: 240,
      scale: 265 / 180, // (256 / 2.2)
      keys: [
        {
          value: [640, 400],
          time: 130.5,
        },
        {
          value: [240, 400],
          time: 130.5 + 4,
        },
        {
          value: [240, 400],
          time: 130.5 + 40,
        },
      ],
    },
  },
};

// FIETSER
createActor(scene, {
  gw: 5, gh: 4, z: -30, x0: -20, x1: 12, t0: 0 * fps, t1: fps * 5.5, // measures in frames
  cSc: 50, cOf: 0,
  vOx: 0, vOy: 313, vOx2: 640, vSc: 2, vt0: 17.5, vt1: 17.5 + 5.5, vt0i: 17.5, // measured in seconds
  videoResourceId: 'leidseplein4',
});

// VOETGANGER MET WITTE TRUI
createActor(scene, {
  gw: 2.5, gh: 2.5, z: -20, x0: -15, x1: 9, t0: 0 * fps, t1: fps * 11,
  cSc: 80, cOf: 0,
  vOx: 0, vOy: 340, vOx2: 640, vSc: 2, vt0: 19.5, vt1: 20 + 11,
  videoResourceId: 'leidseplein4',
});

// DRIE VROUWEN VAN RECHTS
createActor(scene, {
  gw: 1.5, gh: 2.5, z: -12, x0: 6, x1: -7, t0: 0 * fps, t1: fps * 14,
  cSc: 80, cOf: 0,
  vOx: 640, vOy: 380, vOx2: 20, vSc: 1.3, vt0: 45, vt1: 44 + 14,
  videoResourceId: 'leidseplein4',
});

// ECHTPAAR MET TASJE
// createActor(scene, {
//   gw: 10, gh: 3, z: -8, x0: 6, x1: 0, t0: 0 * fps, t1: fps * 4,
//   cSc: 80, cOf: 0,
//   vOx: 640, vOy: 362, vOx2: 320, vSc: 1.3, vt0: 130.5, vt1: 130.5 + 4,
//   videoResourceId: 'leidseplein3a',
// });

export default scene;
