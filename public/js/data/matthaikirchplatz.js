import { musicToTime, setTiming, uuidv4, } from '../app/util.js';
import { fps, } from './matthaikirchplatz-shared.js';
import scene1 from './matthaikirchplatz-scene1.js';

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
    backgroundImage: null, // 'mkp-background.jpg',
    backgroundVideoResourceId: 'mkp_preview', // '30seconds',
    backgroundVideoStartTime: 5,
    backgroundVideoEndTime: 300,
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
    speed: 0,
    fieldOfView: 18,
    position: [0, 2, 16],
    target: [0, 2, 0],
  },
  resources: [
    {
      id: '30seconds',
      url: 'frames/30seconds/frame_#.png',
      frames: 900,
      fps: 30,
      width: 640,
      height: 360,
    },
    {
      id: 'mkp_preview',
      url: 'frames/mkp_preview/frame_#.png',
      frames: 16906,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: 'mkp_dame',
      url: 'frames/mkp_dame/frame_#.png',
      frames: 450,
      fps: 30,
      width: 1920,
      height: 305,
    },
    {
      id: 'mkp_dame_preview',
      url: 'frames/mkp_dame_preview/frame_#.png',
      frames: 450,
      fps: 30,
      width: 480,
      height: 76,
    },
  ],
  score: [
    scene1,
  ],
};

export default data;
