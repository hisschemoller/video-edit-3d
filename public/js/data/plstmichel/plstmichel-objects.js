import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { getDefaultScene, fps, } from './plstmichel-shared.js';

const scene = getDefaultScene([0, 180], 2, false);

// PAAL
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, 1, 0, -40 ,1],
  modelFile: 'plstmichel.glb',
  modelName: 'paal',
});
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [0.5,0,0,0 ,0,1.5,0,0 ,0,0,0.5,0, 2, 0, -30 ,1],
  modelFile: 'plstmichel.glb',
  modelName: 'paal',
});
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [0.5,0,0,0 ,0,1.5,0,0 ,0,0,0.5,0, -30, 0, -35 ,1],
  modelFile: 'plstmichel.glb',
  modelName: 'paal',
});

// SLEUTELGAT
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/leger-sleutelgat.jpg',
  matrix: [0.7,0,0,0 ,0,0.7,0,0 ,0,0,0.7,0, -4, 0, -35 ,1],
  modelFile: 'plstmichel.glb',
  modelName: 'sleutelgat',
});

{ // PAAL2 VIERKANT MET DINGEN
  const x = -10, z = -45;
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/paal-groen.jpg',
    matrix: [2,0,0,0 ,0,1,0,0 ,0,0,2,0, x, 0, z,1],
    modelFile: 'plstmichel.glb',
    modelName: 'paal2',
  });
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/chillida.jpg',
    matrix: [1.5,0,0,0 ,0,1.5,0,0 ,0,0,0.4,0, x - 0.05, 11, z,1],
    modelFile: 'plstmichel.glb',
    modelName: 'rechthoek',
    rotateY: Math.PI * 0.5,
  });
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/green.jpg',
    matrix: [0.7,0,0,0 ,0,0.7,0,0 ,0,0,0.1,0, x, 7, z-0.05,1],
    modelFile: 'plstmichel.glb',
    modelName: 'halfcircle',
  });
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/green.jpg',
    matrix: [0.7,0,0,0 ,0,0.7,0,0 ,0,0,0.1,0, x, 7, z-0.05,1],
    modelFile: 'plstmichel.glb',
    modelName: 'halfcircle',
    rotateY: Math.PI,
  });
}

// POORTJE
// scene.object.children.push({
//   id: uuidv4(),
//   imageFile: 'testimage3d.jpg',
//   matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, -4, 0, -35 ,1],
//   modelFile: 'plstmichel.glb',
//   modelName: 'poortje',
// });

export default scene;
