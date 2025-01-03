import { setup as setupPlayer } from './player.js';
import { setup as setupUI } from './ui.js';
import convertPreviewToHiRes from './hi-res.js';
// import dataMatthaikirchplatz from '../data/matthaikirchplatz/matthaikirchplatz.js';
// import dataMunchen from '../data/munchen/munchen.js';
import dataPlaceSaintMichel from '../data/plstmichel/plstmichel.js';
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

// const hiResData = convertPreviewToHiRes(dataPlaceSaintMichel);

setupUI();
setupPlayer({
  data: dataPlaceSaintMichel,
  isCapture: true,
  // scenesToPlay: ['scene_main', 'scene_actors1'],
  // startSceneIndex: 0,
  // startSceneName: 'scene_actors2', // 'scene_walls6', // 'scene_actors3', // 'scene_walls7', // 'scene_walls3',
  // scenesToNotSkip: ['scene_main', 'scene_objects'],
  captureThrottle: 15, // 15 is 2 frames rendered a second at 30 FPS
});
