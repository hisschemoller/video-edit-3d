import { fps, } from './munchen-shared.js';
import scene1 from './munchen-scene1.js';

/**
 * All data.
 */
const data = {
  settings: {
    backgroundImage: 'munchen/munchen-staat_2021-01-04.jpg',
    width: 4 * 150,
    height: 5 * 150,
    fps,
  },
  camera: {
    speed: 0,
    fieldOfView: 25,
    position: [-0.2, 1.6, 16],
    target: [0, 2, 0],
  },
  gltfFiles: [ 'munchen.glb' ],
  resources: [],
  score: [
    scene1,
  ],
};

export default data;
