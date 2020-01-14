import { setup } from './player.js';
import dataTest from '../data/test.js';
import dataLeidseplein from '../data/leidseplein.js';
import dataTest2 from '../data/test-2020-01-08.js';
import dataLockedGroove3 from '../data/locked-groove-3.js';

setup({
  data: dataLockedGroove3,
  isCapture: false,
  startScene: 0,
});
