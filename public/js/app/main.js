import { setup } from './player.js';
import convertPreviewToHiRes from './hi-res.js';
import dataMatthaikirchplatz from '../data/matthaikirchplatz/matthaikirchplatz.js';
// import dataLeidseplein from '../data/leidseplein.js';
// import dataTest from '../data/test.js';
// import dataTest2 from '../data/test-2020-01-08.js';
// import dataTest3 from '../data/test-2020-01-20.js';
// import dataTest4 from '../data/test-2020-01-27.js'; // complex animation
// import dataTest5 from '../data/test-2020-01-29.js'; // keyframe video animation
// import dataTest6 from '../data/test-2020-02-03.js'; // start object at later time
// import dataTest7 from '../data/test-2020-02-17.js'; // repair capture
// import dataLockedGroove3 from '../data/locked-groove-3.js';
// import dataTestSvg from '../data/test-svg.js';

// const hiResData = convertPreviewToHiRes(dataMatthaikirchplatz);

setup({
  data: dataMatthaikirchplatz,
  isCapture: false,
  startScene: 0,
  captureThrottle: 15,
});
