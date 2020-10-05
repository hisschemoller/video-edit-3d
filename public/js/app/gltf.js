import { Matrix4, MeshPhongMaterial, TextureLoader, Vector3 } from '../lib/three/build/three.module.js';
import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js';

const gltfObjects = {};

/**
 * Load external model files into the scene.
 * @param {Object} scene Three.js Scene.
 * @param {Object} allData 
 * @param {Number} sceneIndex 
 */
export function addGLTFModelsToScene(scene, allData, sceneIndex) {
  const { external3DModels } = allData.score[sceneIndex];
  external3DModels.forEach(modelData => {
    console.log(modelData);
    const { id, imageFile, keys, modelFile, modelName } = modelData;

    // get mesh
    const mesh = gltfObjects[modelFile].scene.getObjectByName(modelName);
    console.log('gltfObjects mesh', mesh);
    console.log('gltfObjects geometry', mesh.geometry.toJSON());
    mesh.uuid = id;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // set position
    const matrix4 = new Matrix4();
    matrix4.setPosition(new Vector3( ...keys[0].value ));
    mesh.position.applyMatrix4(matrix4);
    
    // load image
    const texture = new TextureLoader().load(`../img/${imageFile}`);
    mesh.material = new MeshPhongMaterial({ map: texture });
  });
}

function loadGLTFFile(gltfFile) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(`3d/${gltfFile}`, gltf => {
      gltfObjects[gltfFile] = gltf;
      resolve();
    });
  });
}

export function loadGLTFFiles(allData) {
  const { gltfFiles } = allData;
  return Promise.all(gltfFiles.map(loadGLTFFile));
}
