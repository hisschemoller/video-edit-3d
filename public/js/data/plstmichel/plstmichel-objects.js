import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { getDefaultScene, getMatrix, fps, } from './plstmichel-shared.js';

const scene = getDefaultScene([0, 180], 'objects', false);
const modelFile = 'plstmichel.glb';

// PAAL
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, 1, 0, -40 ,1],
  modelFile, modelName: 'paal',
});
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [0.5,0,0,0 ,0,1.5,0,0 ,0,0,0.5,0, 2, 0, -30 ,1],
  modelFile, modelName: 'paal',
});
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [0.5,0,0,0 ,0,1.5,0,0 ,0,0,0.5,0, -30, 0, -35 ,1],
  modelFile, modelName: 'paal',
});
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/paal-groen.jpg',
  matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0, 5, 6, -25 ,1],
  modelFile, modelName: 'sphere',
});

// BOL

// SLEUTELGAT
scene.object.children.push({
  id: uuidv4(),
  imageFile: 'plstmichel/leger-sleutelgat.jpg',
  matrix: [0.7,0,0,0 ,0,0.7,0,0 ,0,0,0.7,0, -9, 0, -35 ,1],
  modelFile, modelName: 'sleutelgat',
});

{ // PAAL2 VIERKANT MET DINGEN
  const x = -10, z = -45;
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/paal-groen.jpg',
    matrix: [2,0,0,0 ,0,1,0,0 ,0,0,2,0, x, 0, z,1],
    modelFile, modelName: 'paal2',
  });
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/chillida.jpg',
    matrix: [1.5,0,0,0 ,0,1.5,0,0 ,0,0,0.4,0, x - 0.05, 11, z,1],
    modelFile, modelName: 'rechthoek',
    rotateY: Math.PI * 0.5,
  });
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/green.jpg',
    matrix: [0.7,0,0,0 ,0,0.7,0,0 ,0,0,0.1,0, x, 7, z-0.05,1],
    modelFile, modelName: 'halfcircle',
  });
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/green.jpg',
    matrix: [0.7,0,0,0 ,0,0.7,0,0 ,0,0,0.1,0, x, 7, z-0.05,1],
    modelFile, modelName: 'halfcircle',
    rotateY: Math.PI,
  });
}

{ // TOREN VAN HALVE CIRKELS
  const x = 4, y = 1.3, z = -30, s = 0.4, h = 2.35;
  for (let i = 0; i < 4; i++) {
    scene.object.children.push({
      id: uuidv4(),
      imageFile: 'plstmichel/green.jpg',
      matrix: [s,0,0,0 ,0,s,0,0 ,0,0,s,0, x,y + (h * i),z,1],
      modelFile, modelName: 'halfcircle',
      rotateY: Math.PI * (i % 2 === 0 ? 0.25 : 0.75),
    });
  }
}

{ // TWEE GEKANTELDE HALVE CIRKELS
  const id = `cirkels_${uuidv4()}`;
  const group = {
    children: [],
    id, name: id,
    matrix: getMatrix({x: -10, y: 6, z: -32 }).elements,
    type: 'Group',
  };
  scene.object.children.push(group);
  for (let i = 0; i < 2; i++) {
    const rx = Math.PI * (0.25 + (i % 2 === 0 ? 0 : 0.5));
    const ry = Math.PI * (0 + (i % 2 === 0 ? 0 : 1));
    const s = 0.6;
    group.children.push({
      id: uuidv4(),
      imageFile: 'plstmichel/green.jpg',
      matrix: getMatrix({ rx, ry, sx: s, sy: s, sz: s, }).elements,
      modelFile, modelName: 'halfcircle',
    });
  }
}

{ // VLAK
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/green.jpg',
    matrix: getMatrix({x: -40, y: 6, z: -32, ry: Math.PI * 0.5 }).elements,
    modelFile, modelName: 'plane',
  });
}
{ // VLAK LANG
  scene.object.children.push({
    id: uuidv4(),
    imageFile: 'plstmichel/green.jpg',
    matrix: getMatrix({x: -45, y: 4, z: -42, ry: Math.PI * 0.5 }).elements,
    modelFile, modelName: 'rechthoek',
  });
}

{ // ZIG ZAG VLAKKEN
  const id = `zigzag_${uuidv4()}`;
  const group = {
    children: [],
    id, name: id,
    matrix: getMatrix({x: -4, z: -32, ry: Math.PI * -0.25 }).elements,
    type: 'Group',
  };
  scene.object.children.push(group);
  for (let i = 0; i < 7; i++) {
    const z = i % 2 === 0 ? 0 : -1.43;
    const rx = Math.PI * (i % 2 === 0 ? -0.25 : 0.25);
    group.children.push({
      id: uuidv4(),
      imageFile: 'plstmichel/green.jpg',
      matrix: getMatrix({ y: i * 1.4, z, rx, sx: 0.6 }).elements,
      modelFile, modelName: 'plane',
    });
  }
}

{ // ZIG ZAG VLAKKEN 2
  const id = `zigzag_${uuidv4()}`;
  const group = {
    children: [],
    id, name: id,
    matrix: getMatrix({x: -32, z: -45, ry: Math.PI * 0.25 }).elements,
    type: 'Group',
  };
  scene.object.children.push(group);
  for (let i = 0; i < 7; i++) {
    const z = i % 2 === 0 ? 0 : -1.43;
    const rx = Math.PI * (i % 2 === 0 ? -0.25 : 0.25);
    group.children.push({
      id: uuidv4(),
      imageFile: 'plstmichel/green.jpg',
      matrix: getMatrix({ y: i * 1.4, z, rx, sx: 0.6 }).elements,
      modelFile, modelName: 'plane',
    });
  }
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
