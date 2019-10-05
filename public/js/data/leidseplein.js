import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import scene1 from './leidseplein-scene1.js'

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
    fps: 30,
    ppqn,
    bpm,
    timesignature: {
      numerator: timeSignatureNumerator,
      denominator: timeSignatureDenominator,
    },
  },
  camera: {
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
      id: 'stoep',
      url: 'frames/stoep/frame_#.png',
      frames: 426,
      fps: 30,
      width: 291,
      height: 91,
    },
  ],
  score: [
    scene1,
  ],
};

export default data;
