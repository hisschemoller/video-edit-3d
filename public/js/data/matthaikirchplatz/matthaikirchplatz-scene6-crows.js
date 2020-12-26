import { addLady, getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
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
  const x1 = -11, x2 = 5, z = -14, t1 = 0;
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
