import { fps, } from './plstmichel-shared.js';
import sceneMain, { wallScenes } from './plstmichel-main.js';
import sceneActors1 from './plstmichel-actors1.js';
import sceneActors2 from './plstmichel-actors2.js';
import sceneActors3 from './plstmichel-actors3.js';
import sceneActors4 from './plstmichel-actors4.js';
import sceneActors5 from './plstmichel-actors5.js';
import sceneActors6 from './plstmichel-actors6.js';
import sceneActors7 from './plstmichel-actors7.js';
import sceneObjects from './plstmichel-objects.js';
import sceneActors from './plstmichel-actors.js';

/**
 * All data.
 */
const data = {
  settings: {
    backgroundImage: 'plstmichel/plstmichel-lucht.jpg',
    width: 16 * 70,
    height: 9 * 70,
    fps,
  },
  camera: {
    speed: 0,
    fieldOfView: 40,
    position: [0, 1.8, -1],
    rotation: [0, 0, 0, 0],
    target: [0, 1.8, 0],
    parentName: 'cameraParent',
  },
  gltfFiles: ['plstmichel.glb'],
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
      id: '1578',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1578/&img=frame_#.png',
      frames: 5756,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1578_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1578_preview/&img=frame_#.png',
      frames: 5756,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1579',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1579/&img=frame_#.png',
      frames: 4351,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1579_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1579_preview/&img=frame_#.png',
      frames: 4351,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1580',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1580/&img=frame_#.png',
      frames: 3743,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1580_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1580_preview/&img=frame_#.png',
      frames: 3743,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1581',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1581/&img=frame_#.png',
      frames: 5486,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1581_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1581_preview/&img=frame_#.png',
      frames: 5486,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1582',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1582/&img=frame_#.png',
      frames: 4905,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1582_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1582_preview/&img=frame_#.png',
      frames: 4905,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1583',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1583/&img=frame_#.png',
      frames: 6523,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1583_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1583_preview/&img=frame_#.png',
      frames: 6523,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1584',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1584/&img=frame_#.png',
      frames: 2560,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1584_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1584_preview/&img=frame_#.png',
      frames: 2560,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1585',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1585/&img=frame_#.png',
      frames: 3301,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1585_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1585_preview/&img=frame_#.png',
      frames: 3301,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1600',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1600/&img=frame_#.png',
      frames: 9647,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1600_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1600_preview/&img=frame_#.png',
      frames: 9647,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1602',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1602/&img=frame_#.png',
      frames: 6392,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1602_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1602_preview/&img=frame_#.png',
      frames: 6392,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1603',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1603/&img=frame_#.png',
      frames: 2590,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1603_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1603_preview/&img=frame_#.png',
      frames: 2590,
      fps: 30,
      width: 480,
      height: 270,
    },
    {
      id: '1628',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1628/&img=frame_#.png',
      frames: 5231,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: '1628_preview',
      url: 'fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1628_preview/&img=frame_#.png',
      frames: 5231,
      fps: 30,
      width: 480,
      height: 270,
    },
  ],
  score: [
    sceneMain,
    ...wallScenes,
    sceneObjects,
    sceneActors1,
    sceneActors2,
    sceneActors3,
    sceneActors4,
    sceneActors5,
    sceneActors6,
    sceneActors7,
    // sceneActors,
  ],
};

export default data;
