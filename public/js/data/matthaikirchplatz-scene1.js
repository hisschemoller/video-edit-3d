import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './matthaikirchplatz-shared.js';

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
  videos: {},
};

export default scene;