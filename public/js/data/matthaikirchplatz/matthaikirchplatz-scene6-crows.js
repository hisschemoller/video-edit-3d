import { getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { 
  addBeakOpenCloseAnimationClip, 
  addLeftRightAnimation,
  addUpDownAnimation,
  createExternalModel,
  createGroup,
} from './matthaikirchplatz-shared-models.js';

const scene = getDefaultScene([ 0 /* 80 */, 600], 6, true);

export default scene;

{ // VOGELKOP OP STOK
  addBirdheadOnStick(scene, {});
  addBirdheadOnStick(scene, {x1: -8, x2: 2, y: 2, z: -4, t1: 1, ocd: 0.6, udd: 3.5, lrd: 5, });
  addBirdheadOnStick(scene, {x1: -9, x2: -2, y: 2, z: -8, t1: 3, ocd: 0.7, udd: 6, lrd: 7, lrr: 1, });
  addBirdheadOnStick(scene, {x1: -10, x2: 1, y: 3.5, z: -12, t1: 7, ocd: 0.44, udd: 2.5, lrd: 2.5, lra: 0.55, });
  addBirdheadOnStick(scene, {x1: -10, x2: -6, y: 1.5, z: -10, t1: 10, ocd: 0.35, udd: 4, lrd: 5.5, });
  addBirdheadOnStick(scene, {x1: -12, x2: -1, y: 5.5, z: -16, t1: 12, ocd: 0.5, udd: 8, lrd: 7.5, lrr: -1, });
  addBirdheadOnStick(scene, {x1: -6, x2: -3, y: 2.5, z: -1, t1: 14, ocd: 0.66, udd: 7, lrd: 4.5, lrba: -0.5, });
}

function addBirdheadOnStick(scene, conf = {}) {
  const { x1 = -11, x2 = 5, y = 4.6, z = -14, t1 = 0,
    ocd: openCloseDuration = 0.4, 
    udd: upDownDuration = 5, 
    lrd: leftRightDuration = 3,
    lra: leftRightAngle = 0.3,
    lrba: leftRightBaseAngle = 0,
    lrr: leftRightRotate = 0,
  } = conf;
  const { id: headId } = createExternalModel(scene, { x1: x1 + 0.6, x2: x2 + 0.6, y, z: z - 0.5, time1: t1, time2: t1 + 17,
    modelName: 'sphereIco' });
  const headData = scene.object.children.find(child => child.id === headId);
  createExternalModel(scene, { x1: 0, y: 0, z: 0, time1: 0, modelName: 'stick', parentObj: headData, });
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel(scene, { x1: 0.2, y: 0, z: 0, time1: 0,  
    modelName: 'beakTriangle', parentObj: headData, });
  const { id: beakTopId, matrix: matrixTop } = createExternalModel(scene, { x1: 0.2, y: 0, z: 0, time1: 0,  
    modelName: 'beakTriangle', parentObj: headData, rx: Math.PI, });
  addLeftRightAnimation(scene, headId, leftRightDuration, leftRightAngle, leftRightBaseAngle, leftRightRotate);
  addUpDownAnimation(scene, headId, upDownDuration, 0.8);
  addBeakOpenCloseAnimationClip(scene, headId, beakTopId, beakBtmId, matrixTop, matrixBtm, openCloseDuration);
}
