import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import { fps, } from './spui-shared.js';
import scene1 from './spui-scene1.js';

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
    backgroundImage: null,
    width: 16 * 50,
    height: 12 * 50,
    fps,
    ppqn,
    bpm,
    timesignature: {
      numerator: timeSignatureNumerator,
      denominator: timeSignatureDenominator,
    },
  },
  camera: {
    speed: 0,
    fieldOfView: 18,
    position: [-0.7, 1.7, 12],
    target: [-0.7, 2, 0],
  },
  resources: [],
  score: [
    scene1,
  ],
};

export default data;
