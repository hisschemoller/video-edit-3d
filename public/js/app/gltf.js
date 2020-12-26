import { Matrix4, MeshPhongMaterial, TextureLoader, Vector3 } from '../lib/three/build/three.module.js';
import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js';
import { uuidv4 } from './util.js';

const gltfObjects = {};

/**
 *
 *
 * @export
 * @param {*} allData
 * @param {*} sceneIndex
 */
export function addGLTFModelsToData(allData, sceneIndex) {
  const { settings, score } = allData;
  const { fps } = settings;
  const sceneData = score[sceneIndex];
  const { external3DModels = [] } = sceneData;
  external3DModels.forEach(modelData => {
    const { id, imageFile, keys, modelFile, modelName } = modelData;

    // get mesh
    const mesh = gltfObjects[modelFile].scene.getObjectByName(modelName);

    // add image data
    const image = {
      url: `img/${imageFile}`,
      uuid: uuidv4(),
    };
    sceneData.images.push(image);

    // add texture data
    const texture = {
      image: image.uuid,
      uuid: uuidv4(),
    };
    sceneData.textures.push(texture);

    // add material data
    const material = new MeshPhongMaterial().toJSON();
    material.map = texture.uuid;
    sceneData.materials.push(material);
    
    // add geometry data
    const geometry = mesh.geometry.toJSON();
    sceneData.geometries.push(geometry);

    // add object data
    const obj = {
      castShadow: true,
      geometry: geometry.uuid,
      layers: 1,
      material: material.uuid,
      matrix: [1,0,0,0 ,0,1,0,0 ,0,0,1,0 , ...keys[0].value ,1],
      name: id,
      receiveShadow: true,
      uuid: id,
      type: 'Mesh',
    };
    sceneData.object.children.push(obj);
  });
}

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

/**
 *
 *
 * @param {*} gltfFile
 * @returns
 */
function loadGLTFFile(gltfFile) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(`3d/${gltfFile}`, gltf => {
      gltfObjects[gltfFile] = gltf;
      resolve();
    });
  });
}

/**
 *
 *
 * @export
 * @param {*} allData
 * @returns
 */
export function loadGLTFFiles(allData) {
  const { gltfFiles } = allData;
  return Promise.all(gltfFiles.map(loadGLTFFile));
}
