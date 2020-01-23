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
      // ...canvas,
      // videoId: 's4g-video',
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
  },
  geometries: [
    {
      depth: 0.01,
      // points: [ [0, 0], [50, 0], [50, 120], [0, 120] ],
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
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -20,0,-8,1],
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
    ],
  },
  videos: {
    's4g-video': {
      resourceId: 'stoep',
      start: 0,
      end: 13,
      isLoop: true,
      offsetX: 0,
      offsetY: 91,
      repeat: 'repeat',
      scale: 1,
    },
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
  gw: 1.5, gh: 2.5, z: -8, x0: 6, x1: -7, t0: 0 * fps, t1: fps * 14,
  cSc: 80, cOf: 0,
  vOx: 640, vOy: 380, vOx2: 20, vSc: 1.3, vt0: 45, vt1: 44 + 14,
  videoResourceId: 'leidseplein4',
});

// createActor(scene, { gw: 0.5, gh: 2, z: -50, t0: 150, t1: 300, });
// createActor({ gh: 3, t0: 150, t1: 300, z: -10, });

export default scene;
