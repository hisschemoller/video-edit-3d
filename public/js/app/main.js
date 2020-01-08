import { setup } from './player.js';
import dataTest from '../data/test.js';
import dataLeidseplein from '../data/leidseplein.js';
import dataTest2 from '../data/test-2020-01-08.js';

setup({
  data: dataLeidseplein, 
  isCapture: false,
  startScene: 3,
});
