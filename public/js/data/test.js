import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import testScene from './test-scene.js'

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
    fps: 12,
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
      id: 'dublin',
      url: 'frames/dublin/frame_#.png',
      frames: 15829,
      fps: 30,
      width: 480,
      height: 360,
    },
  ],
  score: [
    testScene,
  ],
};

export default data;
