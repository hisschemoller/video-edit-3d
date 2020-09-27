import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './matthaikirchplatz-shared.js';
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
  lifespan: [0, 90],
  materials: [],
  metadata: {
    generator: 'video-edit-3d',
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
  keys: [{t: 0, v: [-7, -0.01, 4]}],
  gw: 14, gh: 0.01, gd: 12,
  cSz: 1024, cSc: 1024 / 14, cOf: 0,
  img: 'mkp-ground.jpg', // 'testimage3d.jpg',
  iOfX: 0, iOfY: 880, iSc: 1,
});

// TEST
createActor(scene, fps, {
  keys: [{t: 0, v: [-2, 0, -2]}],
  gw: 1, gh: 1, gd: 1,
  cSz: 1024, cSc: 1024, cOf: 0,
  img: 'testimage3d.jpg', // 'mkp-ground.jpg',
  iOfX: 0, iOfY: 1024, iSc: 1,
});

// CUBE
// createActor(scene, fps, {
//   gw: 1, gh: 2, gd: 1,
// });

export default scene;