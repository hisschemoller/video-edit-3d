import { fps, } from './munchen-shared.js';

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
    fieldOfView: 18,
    position: [0, 2, 16],
    target: [0, 2, 0],
  },
  gltfFiles: [],
  resources: [],
  score: [],
};

export default data;
