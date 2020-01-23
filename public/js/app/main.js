import { setup } from './player.js';
import dataTest from '../data/test.js';
import dataLeidseplein from '../data/leidseplein.js';
import dataTest2 from '../data/test-2020-01-08.js';
import dataTest3 from '../data/test-2020-01-20.js';
import dataLockedGroove3 from '../data/locked-groove-3.js';
import dataTestSvg from '../data/test-svg.js';

setup({
  data: dataLeidseplein,
  isCapture: false,
  startScene: 3,
});
