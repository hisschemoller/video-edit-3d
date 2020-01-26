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
  offsetX: 0,
  offsetY: 480,
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
const treePos = [-4.8, 0, -8];
const polerightPos = [5.5, 0, -13];

const scene = {
  animations: [
    {
      fps: 30,
      loop: false,
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
      scale: 256 / 4.8,
      videoId: 's4-tree-video',
    },
    's4-poleright-canvas': {
      ...canvas,
      scale: 256 / 6,
      imageId: 'scene4-image',
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
      points: [[0.75741,0.02073],[0.71403,2.91116],[0.75741,2.9823],[0.75741,3.98053],[-0.00968,3.98053],[-0.00968,4.8],[3.51128,4.8],[3.51128,3.98053],[0.90997,3.98053],[0.90997,2.9823],[0.95964,2.84337],[1.01923,0.02073],[0.85256,0]],
      uuid: 's4-tree-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.1,
      points: [[0.04889,0],[0.04889,2.2421],[0.07449,2.31998],[0.04889,3.78301],[0.04889,3.87636],[0,5.25286],[0.02074,5.29285],[0,6],[0.04889,6],[0.07449,5.29285],[0.09636,5.25286],[0.1446,3.80425],[0.1829,3.69366],[0.1829,2.31998],[0.22207,2.2421],[0.26663,0]],
      uuid: 's4-poleright-geom',
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
      offsetX: 290,
      offsetY: 480 - 200,
      scale: 0.80,
    },
    's4-concert-video': {
      ...videoScene4,
      offsetX: 0,
      offsetY: 480 - 200,
      scale: 0.58,
    },
    's4-moderne-video': {
      ...videoScene4,
      offsetX: 520,
      offsetY: 480 - 210,
      scale: 0.9,
    },
    's4-maison-video': {
      ...videoScene4,
      offsetX: 330,
      offsetY: 480 - 210,
      scale: 1.15,
    },
    's4-tree-video': {
      ...videoScene4,
      offsetX: 0,
      offsetY: 342,
      scale: 256 / 342, // (256 / 4.8)
    },
    's4-poleright-image': {
      file: 'leidseplein-scene-4.jpg',
      offsetX: 589,
      offsetY: 295,
      scale: 256 / 295,
    },
    },
    'test3d-image': {
      file: 'testimage3d.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
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
  gw: 1.5, gh: 2.5, z: -10, x0: 6, x1: -7, t0: 0 * fps, t1: fps * 14,
  cSc: 80, cOf: 0,
  vOx: 640, vOy: 380, vOx2: 20, vSc: 1.3, vt0: 45, vt1: 44 + 14,
  videoResourceId: 'leidseplein4',
});

export default scene;
