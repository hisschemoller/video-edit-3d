import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';
import scene1 from './leidseplein-scene1.js';
import scene2 from './leidseplein-scene2.js';
import scene3 from './leidseplein-scene3.js';

const ppqn = 24; // parts per quarter note
const bpm = 112; // beats per minute
const timeSignatureNumerator = 4; // number of beats in a measure
const timeSignatureDenominator = 4; // length of a beat (4 = quarter note, 8 = eight note)

setTiming(bpm, ppqn, timeSignatureNumerator, timeSignatureDenominator);

/**
 * All data.
 */
const data = {
  settings: {
    width: 16 * 50,
    height: 9 * 50,
    fps,
    ppqn,
    bpm,
    timesignature: {
      numerator: timeSignatureNumerator,
      denominator: timeSignatureDenominator,
    },
  },
  camera: {
    speed: -0.002,
    fieldOfView: 18,
    position: [0, 2, 16],
    target: [0, 2, 0],
  },
  resources: [
    {
      id: 'leidseplein1',
      url: 'frames/leidseplein1/frame_#.png',
      frames: 6303,
      fps: 30,
      width: 640,
      height: 480,
    },
    {
      id: 'leidseplein2',
      url: 'frames/leidseplein2/frame_#.png',
      frames: 7798,
      fps: 30,
      width: 640,
      height: 480,
    },
    {
      id: 'leidseplein3a',
      url: 'frames/leidseplein3a/frame_#.png',
      frames: 4383,
      fps: 30,
      width: 640,
      height: 480,
    },
    {
      id: 'stoep',
      url: 'frames/stoep/frame_#.png',
      frames: 426,
      fps: 30,
      width: 291,
      height: 91,
    },
    {
      id: 'tram',
      url: 'frames/tram/frame_#.png',
      frames: 213,
      fps: 30,
      width: 100,
      height: 74,
    },
  ],
  score: [
    scene1,
    scene2,
    scene3,
  ],
};

export default data;
