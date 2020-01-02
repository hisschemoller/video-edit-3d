import { setup } from './player.js';
import dataTest from '../data/test.js';
import dataLeidseplein from '../data/leidseplein.js';

setup({
  data: dataLeidseplein, 
  isCapture: false,
  startScene: 0,
});
