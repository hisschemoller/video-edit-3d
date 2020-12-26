import { addLady, getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import { 
  addBeakOpenCloseAnimationClip, 
  addLeftRightAnimation,
  addUpDownAnimation,
  createExternalModel,
  createGroup,
} from './matthaikirchplatz-shared-models.js';

const scene = getDefaultScene([ 0 /* 80 */, 600], 5, true);

export default scene;


{ // CYLINDER 0
  const { id } = createExternalModel(scene, {x1: -9.0, x2: 11, y: 4, z: -5, time1: 0, time2: 30, modelName: 'cylinder'});
  addLeftRightAnimation(scene, id, 2);
}
{ // CYLINDER 1
  const { id } = createExternalModel(scene, {x1: -11.0, x2: 13, y: 1, z: -15, time1: 2, time2: 32, modelName: 'cylinder'});
  addLeftRightAnimation(scene, id, 0.8);
}
{ // CYLINDER 2
  const { id } = createExternalModel(scene, {x1: -10, x2: 10, y: 0.2, z: 0, time1: 12, time2: 21, modelName: 'cylinder'});
  addLeftRightAnimation(scene, id, 4);
}
{ // SPHERE
  const { id } = createExternalModel(scene, {x1: -9.0, x2: 11, y: 3, z: -6, time1: 5, time2: 33, modelName: 'sphereBeak'});
  addLeftRightAnimation(scene, id, 3);
  addUpDownAnimation(scene, id, 4, 0.5);
}
{ // SNAVEL
  const { uuid: beakId } = createGroup(scene, { x1: -5.5, x2: 5, y: 1.5, z: 2, time1: 9, time2: 31 });
  const beakData = scene.object.children.find(child => child.uuid === beakId);
  const { id: beakTopId, matrix: matrixTop } = createExternalModel(scene, { x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakFirst', parentObj: beakData, });
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel(scene, { x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakFirst', parentObj: beakData, rx: Math.PI, });
  addLeftRightAnimation(scene, beakId, 2);
  addUpDownAnimation(scene, beakId, 5, 0.5);
  addBeakOpenCloseAnimationClip(scene, beakId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.9);
}
{ // SNAVEL DUN
  const { uuid: beakId } = createGroup(scene, { x1: -13, x2: 15, y: 6, z: -20, time1: 15, time2: 24 });
  const beakData = scene.object.children.find(child => child.uuid === beakId);
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel(scene, { x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakThin', parentObj: beakData, });
  const { id: beakTopId, matrix: matrixTop } = createExternalModel(scene, { x1: 0, y: 0, z: 0, time1: 0,  
    modelName: 'beakThin', parentObj: beakData, rx: Math.PI, });
  addLeftRightAnimation(scene, beakId, 3);
  addBeakOpenCloseAnimationClip(scene, beakId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.6);
}
{ // VROUW MET VOGELKOP
  const x1 = -8, x2 = 8, z = -4, t1 = 16;
  { // VROUW ZONDER HOOFD
    const y = -0.5, h = 1.6, vy = 73;
    addLady( scene, t1, x1, x2, y, z, h, vy);
  }
  { // SNAVEL MET KOP
    const { id: headId } = createExternalModel(scene, { x1: x1 + 0.6, x2: x2 + 0.6, y: 1.6, z: z - 0.5, time1: t1, time2: t1 + 17,
      modelName: 'sphereIco' });
    const headData = scene.object.children.find(child => child.id === headId);
    const { id: beakBtmId, matrix: matrixBtm } = createExternalModel(scene, { x1: 0.2, y: 0, z: 0, time1: 0,  
      modelName: 'beakTriangle', parentObj: headData, });
    const { id: beakTopId, matrix: matrixTop } = createExternalModel(scene, { x1: 0.2, y: 0, z: 0, time1: 0,  
      modelName: 'beakTriangle', parentObj: headData, rx: Math.PI, });
    addLeftRightAnimation(scene, headId, 3);
    addBeakOpenCloseAnimationClip(scene, headId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.6);
  }
}
{ // VOGELKOP OP STOK
  const x1 = -11, x2 = 5, z = -14, t1 = 18;
  const { id: headId } = createExternalModel(scene, { x1: x1 + 0.6, x2: x2 + 0.6, y: 4.6, z: z - 0.5, time1: t1, time2: t1 + 17,
    modelName: 'sphereIco' });
  const headData = scene.object.children.find(child => child.id === headId);
  createExternalModel(scene, { x1: 0, y: 0, z: 0, time1: 0, modelName: 'stick', parentObj: headData, });
  const { id: beakBtmId, matrix: matrixBtm } = createExternalModel(scene, { x1: 0.2, y: 0, z: 0, time1: 0,  
    modelName: 'beakTriangle', parentObj: headData, });
  const { id: beakTopId, matrix: matrixTop } = createExternalModel(scene, { x1: 0.2, y: 0, z: 0, time1: 0,  
    modelName: 'beakTriangle', parentObj: headData, rx: Math.PI, });
  addLeftRightAnimation(scene, headId, 3);
  addUpDownAnimation(scene, headId, 5, 0.8);
  addBeakOpenCloseAnimationClip(scene, headId, beakTopId, beakBtmId, matrixTop, matrixBtm, 0.4);
}
