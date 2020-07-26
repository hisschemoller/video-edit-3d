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
  canvas: { offset: 0, scale: 1024 / 10, size: 1024 },
  geom: { w: 10, h: 10, d: 0.01 },
  image: { file: 'spui/spui-ground.jpg', offx: 0, offy: 1024, scale: 1 },
  keys: [{ t: 0, v: [-5, 0, 5] }],
  rotate: [1,0,0,0, 0,0,-1,0 ,0,1,0,0],
});

createActor(scene);

export default scene;