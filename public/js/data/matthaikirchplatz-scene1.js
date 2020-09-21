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
  videos: {},
};

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-2, -0.01, 2]}],
  gw: 4, gh: 0.01, gd: 4,
});

// CUBE
createActor(scene, fps, {
  gw: 1, gh: 2, gd: 1,
});

export default scene;