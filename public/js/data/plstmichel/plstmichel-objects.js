import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { getDefaultScene, fps, } from './plstmichel-shared.js';

const scene = getDefaultScene([0, 180], 2, false);

scene.object.children.push({
  id: uuidv4(),
  imageFile: 'testimage3d.jpg',
  matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, 1, 0, -40 ,1],
  modelFile: 'plstmichel.glb',
  modelName: 'paal',
});

export default scene;
