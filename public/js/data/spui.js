import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import { fps, } from './spui-shared.js';
import sceneFirstTry from './spui-scene-first-try.js';
import sceneGround from './spui-scene-ground.js';
import sceneNieuwezijds from './spui-scene-nieuwezijds.js';
import sceneABC from './spui-scene-abc.js';
import sceneAthenaeum from './spui-scene-athenaeum.js';
import sceneHotdogs from './spui-scene-hotdogs.js';

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
    width: 45 * 10,
    height: 55 * 10,
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
    position: [-1.2, 1.6, 12],
    target: [-1.2, 2, 0],
  },
  resources: [],
  score: [
    // sceneFirstTry,
    sceneGround,
    sceneNieuwezijds,
    sceneABC,
    sceneAthenaeum,
    sceneHotdogs,
  ],
};

export default data;
