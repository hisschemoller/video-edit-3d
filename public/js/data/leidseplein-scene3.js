import { musicToTime, uuidv4, } from '../app/util.js';
import { fps, } from './leidseplein-shared.js';

const canvas = {
  offsetX: 256,
  offsetY: 256,
  scale: 60,
  width: 512,
  height: 512
};

export const wallMesh = {
  castShadow: true,
  geometry: 's3w1-geom',
  layers: 1,
  material: 's3w1-mat',
  matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, 0, 0, 0, 1],
  receiveShadow: true,
  type: 'Mesh',
  uuid: 's3w-obj',
};

const videoScene3 = {
  resourceId: 'leidseplein3a',
  start: 0,
  end: 146,
  isLoop: true,
  keys: [
    {
      time: 0,
      value: [0, 480],
    },
  ],
  scale: 1,
};

const start = fps * 30;

const wall1LPos = [-2.67, 0, -11];
const wall1LPos2 = [-2.67 - 5, 0, -11];
const wall1RPos = [0, 0, -11];
const wall1RPos2 = [0 + 5, 0, -11];

const wall1Start = start + (fps * 3.5);
const wall1End = start + (fps * 12);

const wall2LPos = [-5.8, 0, -8.6];
const wall2LPos2 = [-5.8 - 3, 0, -8.6];
const wall2RPos = [2.5, 0, -11];
const wall2RPos2 = [2.5 + 3, 0, -11];

const wall2Start = start + (fps * 3);
const wall2End = start + (fps * 12);

const paal1Pos = [2.3, 0, -6];
const paal1Pos2 = [2.3 + 3, 0, -6];
const paal2Pos = [1.1, 0, -9];
const paal2Pos2 = [1.1 + 4, 0, -9];
const tramPos = [-3.5, 0, -8];
const tramPos2 = [-3.5 - 3, 0, -8];

const paal1Start = start + (fps * 1);
const paal1End = start + (fps * 11);

const scene = {
  animations: [
    {
      duration: 112,
      fps,
      loop: THREE.LoopOnce,
      name: 's3-anim',
      tracks: [
        {
          interpolation: THREE.InterpolateSmooth,
          name: 's3w1l-obj.position',
          type: 'vector3',
          keys: [
            {
              value: wall1LPos,
              time: wall1Start,
            },
            {
              value: wall1LPos2,
              time: wall1End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 's3w1r-obj.position',
          type: 'vector3',
          keys: [
            {
              value: wall1RPos,
              time: wall1Start,
            },
            {
              value: wall1RPos2,
              time: wall1End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 's3w2l-obj.position',
          type: 'vector3',
          keys: [
            {
              value: wall2LPos,
              time: wall2Start,
            },
            {
              value: wall2LPos2,
              time: wall2End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 's3w2r-obj.position',
          type: 'vector3',
          keys: [
            {
              value: wall2RPos,
              time: wall2Start,
            },
            {
              value: wall2RPos2,
              time: wall2End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'paal1-obj.position',
          type: 'vector3',
          keys: [
            {
              value: paal1Pos,
              time: paal1Start,
            },
            {
              value: paal1Pos2,
              time: paal1End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'paal2-obj.position',
          type: 'vector3',
          keys: [
            {
              value: paal2Pos,
              time: paal1Start,
            },
            {
              value: paal2Pos2,
              time: paal1End,
            },
          ],
        },
        {
          interpolation: THREE.InterpolateSmooth,
          name: 'tram-obj.position',
          type: 'vector3',
          keys: [
            {
              value: tramPos,
              time: paal1Start,
            },
            {
              value: tramPos2,
              time: paal1End,
            },
          ],
        },
      ],
    },
  ],
  canvases: {
    's3g-canvas': {
      offsetX: 0,
      offsetY: 0,
      scale: 1024 / 10,
      width: 1024,
      height: 1024,
      imageId: 's3-ground-image',
    },
    's3wl1-canvas': {
      ...canvas,
      scale: 60,
      videoId: 's3wl1-video',
    },
    's3wr1-canvas': {
      ...canvas,
      scale: 60,
      videoId: 's3wr1-video',
    },
    's3wl2-canvas': {
      ...canvas,
      scale: 45,
      videoId: 's3wl2-video',
    },
    's3wr2-canvas': {
      ...canvas,
      scale: 40,
      videoId: 's3wr2-video',
    },
    'paal1-canvas': {
      ...canvas,
      scale: 76,
      videoId: 'paal1-video',
    },
    'paal2-canvas': {
      ...canvas,
      scale: 41.3,
      videoId: 'paal2-video',
    },
    'tram-canvas': {
      ...canvas,
      scale: 29.4,
      videoId: 'tram-video',
    },
  },
  geometries: [
    {
      depth: 0.01,
      points: [ [0, 0], [10, 0], [10, 7], [0, 7] ],
      type: 'CanvasExtrudeGeometry',
      uuid: 's3g-geom',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [2.67, 0], [2.67, 4], [0, 4] ],
      uuid: 's3w1-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [ [0, 0], [4, 0], [4, 4], [0, 4] ],
      uuid: 's3w2-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [[-0.19403188039171484,0],[-0.19403188039171484,1.7996848099638798],[-0.2658680113781369,1.7996848099638798],[-0.2658680113781369,1.7594179788718358],[-0.7843295412420198,1.7594179788718358],[-0.7712897643339744,3.1987224744280662],[-0.2554492296286082,3.1987224744280662],[-0.2658810511550447,2.197893517181769],[-0.1940449201686226,2.197893517181769],[-0.18080954660695672,2.8088461846544184],[-0.1499574344425216,2.8557893815233815],[-0.11475003679079929,5.1978115528697755],[-0.7788137156099166,5.7370324075712675],[-0.7788137156099166,6.483533556003048],[-0.2262401293545865,7],[0.6895042835667152,7],[1.1530813924246355,6.458914457200658],[1.1652605440567503,5.621917257027043],[0.023549837095930438,5.197863711977408],[0.00903656539727596,2.878661150220093],[0.04707359463804392,2.788347655354971],[0.04707359463804392,2.213645567686688],[0.11812733900998323,2.213645567686688],[0.11812733900998323,3.1818359633321474],[0.6210193752456601,3.155756409516057],[0.6330681291086938,1.7419055584843306],[0.11812733900998248,1.7594440584256517],[0.10508756210193713,1.7997108895176956],[0.04707359463804392,1.7997108895176956],[0.07563070606666322,0.000026079553815474016]],
      uuid: 'paal1-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [[-0.06969578046192555,0],[-0.06955042951205778,1.7565904543186188],[-0.042612053469769776,1.7809609635798969],[-0.07032563457802245,4.0602576587838],[-0.050509455079289826,4.0717161586650965],[-0.06090204799488389,5],[-0.03955968352253137,5],[-0.021923768271824996,4.050664496092482],[-0.00671036885226013,4.023047815617475],[0.010513718707152378,2.9129541611554433],[0.04842609146450829,2.8616695010101894],[0.06938085340387778,1.7809609635798975],[0.08028217464401181,1.7371134270362463],[0.09522909732215197,0.000024225158312213757],[0.0001211257915583147,0.000024225158312213757]],
      uuid: 'paal2-geom',
      type: 'CanvasExtrudeGeometry',
    },
    {
      depth: 0.01,
      points: [[0,1.7969805606205769],[0.07564051055413051,1.9252464690793338],[0.4131841641684953,2.060039558673548],[0.8968754828939642,2.143737058441759],[1.473613128534784,2.2],[2.5138826219983317,2.2],[2.8611490558457215,2.1805204437988692],[2.931486231727293,0.8969774700992057],[2.9840436381617583,0.35957288994653397],[2.9523936088018052,0.1689248076150445],[2.348935315387706,0.1189850727817783],[2.7520907377074515,0.047356058967147785],[1.9055969342028003,0],[0.8381308526748464,0.08838891120932085],[0.07564051055413051,0.2853602002657848]],
      uuid: 'tram-geom',
      type: 'CanvasExtrudeGeometry',
    },
  ],
  clipId: uuidv4(),
  lifespan: [88, 200],
  materials: [
    {
      color: 0xf7f7f7,
      type: 'MeshPhongMaterial',
      uuid: 's3g-mat',
    },
    {
      color: 0xffdd99,
      type: 'MeshPhongMaterial',
      uuid: 's3w1-mat',
    },
  ],
  metadata: {
    generator: 'Wouter Hisschemöller',
    type: 'Object',
    version: 4.3,
  },
  object: {
    type: 'Group',
    name: 'scene3',
    uuid: 'scene3',
    children: [
      {
        canvasId: 's3g-canvas',
        castShadow: false,
        geometry: 's3g-geom',
        layers: 1,
        material: 's3g-mat',
        matrix: [1,0,0,0, 0,0,-1,0 ,0,1,0,0, -5,0,-4,1],
        receiveShadow: true,
        type: 'Mesh',
        name: 's3g-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wl1-canvas',
        geometry: 's3w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1LPos, 1],
        name: 's3w1l-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wr1-canvas',
        geometry: 's3w1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall1RPos, 1],
        name: 's3w1r-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wl2-canvas',
        geometry: 's3w2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall2LPos, 1],
        rotateY: Math.PI / 5,
        name: 's3w2l-obj',
      },
      {
        ...wallMesh,
        canvasId: 's3wr2-canvas',
        geometry: 's3w2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...wall2RPos, 1],
        rotateY: Math.PI / -5,
        name: 's3w2r-obj',
      },
      {
        ...wallMesh,
        canvasId: 'paal1-canvas',
        geometry: 'paal1-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...paal1Pos, 1],
        name: 'paal1-obj',
      },
      {
        ...wallMesh,
        canvasId: 'paal2-canvas',
        geometry: 'paal2-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...paal2Pos, 1],
        name: 'paal2-obj',
      },
      {
        ...wallMesh,
        canvasId: 'tram-canvas',
        geometry: 'tram-geom',
        matrix: [1,0,0,0, 0,1,0,0 ,0,0,1,0, ...tramPos, 1],
        name: 'tram-obj',
      },
    ],
  },
  videos: {
    's3-ground-image': {
      file: 'leidseplein-ground.jpg',
      offsetX: 0,
      offsetY: 1024,
      scale: 1,
    },
    's3wl1-video': {
      ...videoScene3,
      keys: [ { ...videoScene3.keys[0], value: [ 270, 480 - 150 + 30 ] } ],
    },
    's3wr1-video': {
      ...videoScene3,
      keys: [ { ...videoScene3.keys[0], value: [ 350, 480 - 150 + 30 ] } ],
    },
    's3wl2-video': {
      ...videoScene3,
      keys: [ { ...videoScene3.keys[0], value: [ 80, 480 - 165 + 30 ] } ],
    },
    's3wr2-video': {
      ...videoScene3,
      keys: [ { ...videoScene3.keys[0], value: [ 480, 480 - 175 + 30 ] } ],
    },
    'paal1-video': {
      ...videoScene3,
      keys: [ { ...videoScene3.keys[0], value: [ 303, 480 - 138 ] } ],
      offsetX: 303,
      offsetY: 480 - 138,
    },
    'paal2-video': {
      ...videoScene3,
      keys: [ { ...videoScene3.keys[0], value: [ 458, 480 - 200 ] } ],
      offsetX: 458,
      offsetY: 480 - 200,
    },
    'tram-video': {
      resourceId: 'tram',
      start: 0,
      isLoop: true,
      keys: [ { ...videoScene3.keys[0], value: [ 4, 74 - 4 ] } ],
      offsetX: 4,
      offsetY: 74 - 4,
    },
  },
};

export default scene;
