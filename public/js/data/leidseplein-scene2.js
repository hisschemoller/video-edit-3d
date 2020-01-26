import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

export const wallMesh = {
  castShadow: true,
  geometry: 's2w1-geom',
  layers: 1,
  material: 's2w1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 's2w-obj',
};

const videoScene2 = {
  resourceId: 'leidseplein2',
  start: 130,
  end: 260,
  isLoop: true,
  offsetX: 0,
  offsetY: 480,
  scale: 0.5,
};

const scene = {
  animations: [
    {
      duration: 120,
      loop: THREE.LoopOnce,
      name: 's2-anim',
      fps,
      tracks: [
      ],
    },
  ],
  canvases: {
    's2g-canvas': {
      offsetX: 0,
      offsetY: 0,
      scale: 1024 / 10,
      width: 1024,
      height: 1024,
      imageId: 's2-ground-image',
    },
    's2wl1-canvas': {
      ...canvas,
      videoId: 's2wl1-video',
    },
    's2wr1-canvas': {
      ...canvas,
      videoId: 's2wr1-video',
    },
  },
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [10, 0], [10, 4], [0, 4] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 's2g-geom',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [2.67, 0], [2.67, 4], [0, 4] ],
      uuid: 's2w1-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [40, 160],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 's2g-mat',
    },
    {
      color: 0xffdd99,
      type: 'MeshPhongMaterial',
      uuid: 's2w1-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene2',
    uuid: 'scene2',
    children: [
      {
        canvasId: 's2g-canvas',
        castShadow: false,
        geometry: 's2g-geom',
        layers: 1,
        material: 's2g-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,0,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 's2g-obj',
      },
    ],
  },
  videos: {
    's2-ground-image': {
      file: 'leidseplein-ground.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
    },
    's2wl1-video': {
      ...videoScene2,
      offsetX: 0,
    },
    's2wr1-video': {
      ...videoScene2,
      offsetX: 320,
    },
  },
};

export default scene;

for( let i = 0; i < 3; i++ ) {
  const wallLName = `s2w${i}l`;
  const wallRName = `s2w${i}r`;
  const wallLPos = [-2.67, 0, -2 + (i * -0.8)];
  const wallLPos2 = [-5.87, 0, -2 + (i * -0.8)];
  const wallRPos = [0, 0, -2 + (i * -0.8)];
  const wallRPos2 = [3.2, 0, -2 + (i * -0.8)];
  const wallStart = fps * (1 + 16.67 + (i * 16.67));
  const wallEnd = fps * (30 + 16.67 + (i * 16.67));

  // use fixed video
  // use fixed geometries
  // create objects
  scene.object.children.push(
    {
      ...wallMesh,
      canvasId: 's2wl1-canvas',
      geometry: 's2w1-geom',
      matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wallLPos, 1],
      name: wallLName,
    },
    {
      ...wallMesh,
      canvasId: 's2wr1-canvas',
      geometry: 's2w1-geom',
      matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wallRPos, 1],
      name: wallRName,
    });
    
  // create animation
  scene.animations[0].tracks.push(
    {
      interpolation: THREE.InterpolateSmooth,
      name: `${wallLName}.position`,
      type: 'vector3',
      keys: [
        {
          value: wallLPos,
          time: wallStart,
        },
        {
          value: wallLPos2,
          time: wallEnd,
        },
      ],
    },
    {
      interpolation: THREE.InterpolateSmooth,
      name: `${wallRName}.position`,
      type: 'vector3',
      keys: [
        {
          value: wallRPos,
          time: wallStart,
        },
        {
          value: wallRPos2,
          time: wallEnd,
        },
      ],
    },
  );
}
