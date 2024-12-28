import { getDefaultScene, fps, PREVIEW_SCALE, } from './plstmichel-shared.js';
import createCamera from './plstmichel-camera.js';
import createActor from '../../app/actor.js';

const scene = getDefaultScene([0, 320], 'main', true);
export default scene;

createCamera(scene);

// GROUND
createActor(scene, fps, {
  keys: [{t: 0, v: [-50, 0, 50]}],
  geom: { w: 100, h: 0.01, d: 100, },
  canvas: { offset: 0, scale: 2048 / 100, size: 2048 },
  image: { file: 'plstmichel/plstmichel-grond.jpg', offx: 0, offy: 2048, scale: 1 }, 
});

// create1585QuaiDesOrfevres(scene, fps);
// create1579QuaiDuMarcheNeufCorner(scene, fps);
// create1579QuaiDuMarcheNeuf(scene, fps);
// create1583Seine(scene, fps);
// create1584BusStop(scene, fps);
// create1584GreenGate(scene, fps);
// create1581Fountain(scene, fps);
// create1600GilbertJeune(scene, fps);
// create1582RueDeLaHuchette(scene, fps);
// create1628QuaiSaintMichel(scene, fps);
// create1628NotreDame(scene, fps);

export const wallScenes = [];
let wallScene;
let sceneStartTime = 0;
let sceneEndTime = 0;
let sceneDuration;
const o = {
  fountain1581Start: 0,
  seine1583Start: 0,
  gilbertJeune1600Start: 0,
  rueDeLaHuchette1582Start: 0,
};

// towards the fountain
o.fountain1581Start = 0;
o.gilbertJeune1600Start = 100;
o.rueDeLaHuchette1582Start = 5;
advanceVideoTimes(43.75);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls1', false);
create1584GreenGate(wallScene, fps);
create1581Fountain(wallScene, fps, o.fountain1581Start);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps, o.rueDeLaHuchette1582Start);
wallScenes.push(wallScene);

// corner part 1
advanceVideoTimes(53.420370902023365, ['fountain1581Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls2', false);
create1581Fountain(wallScene, fps, o.fountain1581Start);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
wallScenes.push(wallScene);

// corner part 2
advanceVideoTimes(63.09074180404672, ['fountain1581Start', 'gilbertJeune1600Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls3', false);
create1581Fountain(wallScene, fps, o.fountain1581Start);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps, o.rueDeLaHuchette1582Start);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
create1579QuaiDuMarcheNeuf(wallScene, fps);
create1579QuaiDuMarcheNeufCorner(wallScene, fps);
create1585QuaiDesOrfevres(wallScene, fps);
wallScenes.push(wallScene);

// passed gilbert jeune
advanceVideoTimes(69.34074180404671, ['gilbertJeune1600Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls4', false);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
create1579QuaiDuMarcheNeuf(wallScene, fps);
create1579QuaiDuMarcheNeufCorner(wallScene, fps);
create1585QuaiDesOrfevres(wallScene, fps);
wallScenes.push(wallScene);

// wide corner
o.seine1583Start = 8;
advanceVideoTimes(88.68148360809344, []);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls5', false);
create1582RueDeLaHuchette(wallScene, fps);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
create1579QuaiDuMarcheNeuf(wallScene, fps);
create1579QuaiDuMarcheNeufCorner(wallScene, fps);
create1585QuaiDesOrfevres(wallScene, fps);
create1583Seine(wallScene, fps, o.seine1583Start);
create1584BusStop(wallScene, fps);
create1584GreenGate(wallScene, fps);
wallScenes.push(wallScene);

// towards the green door
advanceVideoTimes(119.93148360809344, ['seine1583Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls6', false);
create1585QuaiDesOrfevres(wallScene, fps);
create1583Seine(wallScene, fps, o.seine1583Start);
create1584BusStop(wallScene, fps);
create1584GreenGate(wallScene, fps);
wallScenes.push(wallScene);

// corner part 1
advanceVideoTimes(129.60185451011677, ['seine1583Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls7', false);
create1585QuaiDesOrfevres(wallScene, fps);
create1583Seine(wallScene, fps, o.seine1583Start);
wallScenes.push(wallScene);

// corner part 2
advanceVideoTimes(139.2722254121401, ['seine1583Start', 'gilbertJeune1600Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls8', false);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
create1579QuaiDuMarcheNeuf(wallScene, fps);
create1579QuaiDuMarcheNeufCorner(wallScene, fps);
create1585QuaiDesOrfevres(wallScene, fps);
create1583Seine(wallScene, fps, o.seine1583Start);
wallScenes.push(wallScene);

// right left slalom towards Rue de la Huchette
advanceVideoTimes(153.48865960886963, ['gilbertJeune1600Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls9', false);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
create1579QuaiDuMarcheNeuf(wallScene, fps);
wallScenes.push(wallScene);

// straight towards Rue de la Huchette
advanceVideoTimes(178.48865960886963, ['gilbertJeune1600Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls10', false);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps);
create1628QuaiSaintMichel(wallScene, fps);
wallScenes.push(wallScene);

// turn towards Notre Dame
advanceVideoTimes(197.5340305108929, []);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls11', false);
create1582RueDeLaHuchette(wallScene, fps);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
wallScenes.push(wallScene);

// turn towards east
advanceVideoTimes(210.32940141291624, []);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls12', false);
create1628QuaiSaintMichel(wallScene, fps);
create1628NotreDame(wallScene, fps);
create1579QuaiDuMarcheNeuf(wallScene, fps);
create1579QuaiDuMarcheNeufCorner(wallScene, fps);
create1585QuaiDesOrfevres(wallScene, fps);
create1583Seine(wallScene, fps);
create1584BusStop(wallScene, fps);
wallScenes.push(wallScene);

// turn towards startpoint
advanceVideoTimes(215.1645868639279, ['fountain1581Start']);
wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls13', false);
create1579QuaiDuMarcheNeuf(wallScene, fps);
create1579QuaiDuMarcheNeufCorner(wallScene, fps);
create1585QuaiDesOrfevres(wallScene, fps);
create1583Seine(wallScene, fps);
create1584BusStop(wallScene, fps);
create1584GreenGate(wallScene, fps);
create1581Fountain(wallScene, fps, o.fountain1581Start);
create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
create1582RueDeLaHuchette(wallScene, fps);
wallScenes.push(wallScene);

// full route extra walls
// advanceVideoTimes(210.3294014129163, []);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls13', false);
// create1579QuaiDuMarcheNeufCorner(wallScene, fps);
// create1585QuaiDesOrfevres(wallScene, fps);
// create1583Seine(wallScene, fps);
// create1584BusStop(wallScene, fps);
// wallScenes.push(wallScene);

// advanceVideoTimes(229.67014321696297, ['fountain1581Start']);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls14', false);
// create1585QuaiDesOrfevres(wallScene, fps);
// create1583Seine(wallScene, fps);
// create1584BusStop(wallScene, fps);
// create1584GreenGate(wallScene, fps);
// create1581Fountain(wallScene, fps, o.fountain1581Start);
// wallScenes.push(wallScene);

// advanceVideoTimes(248.42014321696297, ['fountain1581Start']);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls15', false);
// create1584GreenGate(wallScene, fps);
// create1581Fountain(wallScene, fps, o.fountain1581Start);
// wallScenes.push(wallScene);

// advanceVideoTimes(258.0905141189863, ['fountain1581Start', 'gilbertJeune1600Start']);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls16', false);
// create1581Fountain(wallScene, fps, o.fountain1581Start);
// create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
// create1582RueDeLaHuchette(wallScene, fps);
// wallScenes.push(wallScene);

// advanceVideoTimes(267.76088502100964, ['fountain1581Start', 'gilbertJeune1600Start']);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls17', false);
// create1581Fountain(wallScene, fps, o.fountain1581Start);
// create1600GilbertJeune(wallScene, fps, o.gilbertJeune1600Start);
// create1582RueDeLaHuchette(wallScene, fps);
// create1628QuaiSaintMichel(wallScene, fps);
// create1628NotreDame(wallScene, fps);
// create1579QuaiDuMarcheNeuf(wallScene, fps);
// create1579QuaiDuMarcheNeufCorner(wallScene, fps);
// create1585QuaiDesOrfevres(wallScene, fps);
// wallScenes.push(wallScene);

// advanceVideoTimes(292.76088502100964, []);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls18', false);
// create1628QuaiSaintMichel(wallScene, fps);
// create1628NotreDame(wallScene, fps);
// create1579QuaiDuMarcheNeuf(wallScene, fps);
// create1579QuaiDuMarcheNeufCorner(wallScene, fps); 
// create1585QuaiDesOrfevres(wallScene, fps);
// wallScenes.push(wallScene);

// advanceVideoTimes(312.10162682505626, ['gilbertJeune1600Start']);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls19', false);
// create1582RueDeLaHuchette(wallScene, fps);
// create1628QuaiSaintMichel(wallScene, fps);
// create1628NotreDame(wallScene, fps);
// create1579QuaiDuMarcheNeuf(wallScene, fps);
// create1579QuaiDuMarcheNeufCorner(wallScene, fps);
// create1585QuaiDesOrfevres(wallScene, fps);
// wallScenes.push(wallScene);

// advanceVideoTimes(318.35162682505626, ['gilbertJeune1600Start']);
// wallScene = getDefaultScene([sceneStartTime, sceneEndTime], 'walls20', false);
// create1582RueDeLaHuchette(wallScene, fps);
// create1628QuaiSaintMichel(wallScene, fps);
// create1628NotreDame(wallScene, fps);
// wallScenes.push(wallScene);

/**
 * Set video playback positions for a time section.
 */
function advanceVideoTimes(newTime, videoStartTimes = []) {
  videoStartTimes.forEach(startTime => {
    o[startTime] += sceneDuration;
  });
  sceneStartTime = sceneEndTime;
  sceneEndTime = newTime;
  sceneDuration = sceneEndTime - sceneStartTime;
}

/**
 * Create a building facade, which is a very thin box.
 * @param {Object} settings
 */
function createFacade(scene, fps, settings) {
  const {
    x = 0, z = -100, w = 10, h = 10,
    imgH = 1920, imgW = 1080, img,
    sX = 0, sY = 0, sW = 1920, sH = 1080,
    vrid, vSc = 1, vt = [0, null], vKeys = [{t: 0, v: [0, 0]}],
    rotateY = 0,
  } = settings;
  const canvasSize = 1024;
  // const h = w * (sH / sW);
  const config = {
    keys: [{t: 0, v: [x, 0, z]}],
    geom: { w, h, d: 0.01, },
    canvas: { offset: 0, scale: canvasSize / Math.max(w, h), size: canvasSize },
    rotateY,
  };
  if (img) {
    config.image = { file: img, offx: sX, offy: sY + sH, scale: canvasSize / Math.max(sW, sH) };
  }
  if (vrid) {
    config.vrid = vrid;
    config.vSc = canvasSize / Math.max(sW, sH);
    config.vt = vt;
    config.vKeys = [{t: 0, v: [sX, sY + sH]}];
  }
  createActor(scene, fps, config);
}

// N 1585 QUAI DES ORFEVRES - PALAIS DE JUSTICE
export function create1585QuaiDesOrfevres(scene, fps, videoStart = 0) {
  // const sX = 0, sY = 0, sW = 983, sH = 551, w = 50;
  const sX = 0*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 983*PREVIEW_SCALE, sH = 551*PREVIEW_SCALE, w = 50;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: -50, z: -40, w, h: w * (sH / sW),
    // img: 'plstmichel/parijs-n-1585.jpg',
    // img: 'fs-img?dir=/Volumes/Seagate Slim Drive/testfoto/parijs/&img=parijs-n.jpg',
    vrid: '1585_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// N 1579 QUAI DU MARCHÉ NEUF (HOEKJE)
export function create1579QuaiDuMarcheNeufCorner(scene, fps, videoStart = 0) {
  // const sX = 803, sY = 237, sW = 300, sH = 445, w = 10;
  const sX = 803*PREVIEW_SCALE, sY = 237*PREVIEW_SCALE, sW = 300*PREVIEW_SCALE, sH = 445*PREVIEW_SCALE, w = 10;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 0, z: -40, w, h: 18,
    // img: 'plstmichel/parijs-n-1579.jpg', rotateY: Math.PI * 0.5,
    vrid: '1579_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// N 1579 QUAI DU MARCHÉ NEUF
export function create1579QuaiDuMarcheNeuf(scene, fps, videoStart = 0) {
  // const sX = 803, sY = 237, sW = 600, sH = 445, w = 20;
  const sX = 803*PREVIEW_SCALE, sY = 237*PREVIEW_SCALE, sW = 600*PREVIEW_SCALE, sH = 445*PREVIEW_SCALE, w = 20;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 0, z: -50, w, h: 18,
    // img: 'plstmichel/parijs-n-1579.jpg',
    vrid: '1579_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// O 1583 HOEK OOST MET SEINE
export function create1583Seine(scene, fps, videoStart = 0) {
  const sX = 270*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 1450*PREVIEW_SCALE, sH = 620*PREVIEW_SCALE, w = 60;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: -50, z: 20, w, h: 25.8,
    rotateY: Math.PI * 0.5,
    // img: 'plstmichel/parijs-o-1583.jpg',
    vrid: '1583_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// O 1584 OOST BUSHALTE
export function create1584BusStop(scene, fps, videoStart = 0) {
  // const sX = 845, sY = 0, sW = 714, sH = 691, w = 20;
  const sX = 845*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 714*PREVIEW_SCALE, sH = 691*PREVIEW_SCALE, w = 20;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: -30, z: 20, w, h: w * (sH / sW),
    // img: 'plstmichel/parijs-o-1584.jpg', rotateY: Math.PI,
    vrid: '1584_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// O 1584 OOST POORT
export function create1584GreenGate(scene, fps, videoStart = 0) {
  // const sX = 0, sY = 0, sW = 845, sH = 691, w = 30;
  const sX = 0*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 845*PREVIEW_SCALE, sH = 691*PREVIEW_SCALE, w = 30;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: -30, z: 50, w, h: w * (sH / sW),
    rotateY: Math.PI * 0.5,
    // img: 'plstmichel/parijs-o-1584.jpg', rotateY: Math.PI * 0.5,
    vrid: '1584_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}


// Z 1581 FONTEIN
export function create1581Fountain(scene, fps, videoStart = 0) {
  const sX = 4*PREVIEW_SCALE, sY = 17*PREVIEW_SCALE, sW = 1910*PREVIEW_SCALE, sH = 636*PREVIEW_SCALE, w = 80;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 50, z: 50, w, h: w * (sH / sW),
    rotateY: Math.PI,
    // img: 'plstmichel/parijs-z-1581.jpg',
    vrid: '1581_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// W 1600 GILBERT JEUNE
export function create1600GilbertJeune(scene, fps, videoStart = 0) {
  const sX = 777*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 760*PREVIEW_SCALE, sH = 665*PREVIEW_SCALE, w = 40;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 50, z: 10, w, h: w * (sH / sW),
    rotateY: Math.PI * -0.5,
    // img: 'plstmichel/parijs-w-1600.jpg',
    vrid: '1600_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// W 1582 RUE DE LA HUCHETTE
  export function create1582RueDeLaHuchette(scene, fps, videoStart = 0) {
  // const sX = 376, sY = 0, sW = 1025, sH = 710, w = 40;
  const sX = 376*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 1025*PREVIEW_SCALE, sH = 710*PREVIEW_SCALE, w = 40;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 50, z: -30, w, h: w * (sH / sW),
    rotateY: Math.PI * -0.5,
    // img: 'plstmichel/parijs-w-1582.jpg', rotateY: Math.PI * -0.5,
    vrid: '1582_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// W 1628 QUAI SAINT MICHEL
export function create1628QuaiSaintMichel(scene, fps, videoStart = 0) {
  // const sX = 900, sY = 0, sW = 509, sH = 767, w = 20;
  const sX = 900*PREVIEW_SCALE, sY = 0*PREVIEW_SCALE, sW = 509*PREVIEW_SCALE, sH = 767*PREVIEW_SCALE, w = 20;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 50, z: -50, w, h: w * (sH / sW),
    // img: 'plstmichel/parijs-w-1628.jpg', rotateY: Math.PI * -0.5,
    vrid: '1628_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// W 1628 NOTRE DAME
export function create1628NotreDame(scene, fps, videoStart = 0) {
  const sX = 3*PREVIEW_SCALE, sY = 9*PREVIEW_SCALE, sW = 898*PREVIEW_SCALE, sH = 758*PREVIEW_SCALE, w = 30;
  createFacade(scene, fps, {
    sX, sY, sW, sH, x: 20, z: -50, w, h: w * (sH / sW),
    // img: 'plstmichel/parijs-w-1628.jpg',
    vrid: '1628_preview', vSc: 1, vt: [videoStart, null], vKeys: [{t: 0, v: [0, 0]}],
  });
}

// TEST
// createFacade({
//   imgH: 1024, imgW: 1024, img: 'testimage3d.jpg', sX: 0, sW: 512, sH: 512, z: -30,
// });

// CUBES
// for (let i = 0, n = 8; i < n; i++) {
//   createActor(scene, fps, {
//     keys: [{t: 0, v: [(Math.random() * 6) - 3, i * 0.75, (Math.random() * 6) - 3]}],
//     img: 'testimage3d.jpg',
//     gw: 0.5, gh: 0.5, gd: 0.5,
//     iOfX: 512, iOfY: 512, iSc: 0.5,
//   });
// }

console.log('wallScenes', wallScenes);
