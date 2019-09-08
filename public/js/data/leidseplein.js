import { musicToTime, setTiming, uuidv4, } from '../app/util.js';

const ppqn = 24; // parts per quarter note
const bpm = 112; // beats per minute
const timeSignatureNumerator = 4; // number of beats in a measure
const timeSignatureDenominator = 4; // length of a beat (4 = quarter note, 8 = eight note)

setTiming(bpm, ppqn, timeSignatureNumerator, timeSignatureDenominator);

const clip = {
  lifespan: [0, Number.POSITIVE_INFINITY],
  animations: [],
};

const scoreScene1 = [
  {
    ...clip,
    clipId: uuidv4(),
    objectId: 'scene1wallL1',
    lifespan: [1, musicToTime('1:0:0')],
    animations: [
      {
        parameterId: 'position',
        parameterType: 'vector3',
        keys: [
          {
            time: 1,
            value: [-3.6, 0, 3.3]
          },
          {
            time: 3,
            value: [-3.6, 0, 3.3]
          }
        ]
      }
    ]
  },
  { ...clip, clipId: uuidv4(), objectId: 'scene1wallR1', },
  { ...clip, clipId: uuidv4(), objectId: 'scene1wallL2', },
  { ...clip, clipId: uuidv4(), objectId: 'scene1wallR2', },
];

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

const videoScene1 = {
  resourceId: 'leidseplein1',
  start: 140,
  end: 210,
  isLoop: true,
  offsetX: 0,
  offsetY: 0,
  scale: 0.5
};

const scene1wall = {
  type: 'canvas-extrude',
  color: '#f7f777',
  depth: 0.01,
  position: [0, 0, 0],
  points: [ [0, 0], [1, 0], [1, 1], [0, 1] ],
  canvas,
  video: videoScene1,
};

const scene1 = {
  scene1wallL1: {
    ...scene1wall,
    position: [-3.6, 0, 3.3],
    points: [ [0, 0], [1.8, 0], [1.8, 4], [0, 4] ],
  },
  scene1wallR1: {
    ...scene1wall,
    position: [1.8, 0, 3.3],
    points: [ [0, 0], [1.8, 0], [1.8, 4], [0, 4] ],
    video: { ...videoScene1, offsetX: 420, },
  },
  scene1wallL2: {
    ...scene1wall,
    position: [-2, 0, 2],
    points: [ [0, 0], [1.2, 0], [1.2, 4], [0, 4] ],
    video: { ...videoScene1, offsetX: 200, },
  },
  scene1wallR2: {
    ...scene1wall,
    position: [0.8, 0, 2],
    points: [ [0, 0], [1.2, 0], [1.2, 4], [0, 4] ],
    video: { ...videoScene1, offsetX: 300, },
  },
  scene1wallL3: {
    ...scene1wall,
    position: [-2, 0, 0],
    points: [ [0, 0], [2, 0], [2, 4], [0, 4] ],
    video: { ...videoScene1, offsetX: 160, },
  },
  scene1wallR3: {
    ...scene1wall,
    points: [ [0, 0], [2, 0], [2, 4], [0, 4] ],
    video: { ...videoScene1, offsetX: 400, },
  },
};

const data = {
  settings: {
    width: 960,
    height: 540,
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
      id: 'leidseplein1',
      url: 'frames/leidseplein1/frame_#.png',
      frames: 6303,
      fps: 30,
      width: 960,
      height: 540,
    }
  ],
  objects: {
    ...scene1,
  },
  score: [
    ...scoreScene1,
  ],
};

export default data;
