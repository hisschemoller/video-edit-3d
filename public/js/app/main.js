import { setup } from './player.js';
import dataSpui from '../data/spui.js';
// import dataTest from '../data/test.js';
// import dataTest2 from '../data/test-2020-01-08.js';
// import dataTest3 from '../data/test-2020-01-20.js';
// import dataTest4 from '../data/test-2020-01-27.js'; // complex animation
// import dataTest5 from '../data/test-2020-01-29.js'; // keyframe video animation
// import dataTest6 from '../data/test-2020-02-03.js'; // start object at later time
// import dataTest7 from '../data/test-2020-02-17.js'; // repair capture
// import dataLockedGroove3 from '../data/locked-groove-3.js';
// import dataTestSvg from '../data/test-svg.js';

setup({
  data: dataSpui,
  isCapture: true,
  startScene: 0,
  captureThrottle: 15,
});
