import { Matrix4, MeshPhongMaterial, TextureLoader, Vector3 } from '../lib/three/build/three.module.js';
import { GLTFLoader } from '../lib/three/examples/jsm/loaders/GLTFLoader.js';
import { uuidv4 } from './util.js';

const gltfObjects = {};

/**
 *
 *
 * @param {*} gltfFile
 * @returns
 */
function loadGLTFFile(gltfFile) {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(`3d/${gltfFile}`, gltf => {
      console.log('gltf', gltf);
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

/**
 *
 *
 * @export
 * @param {*} objectData
 * @param {*} sceneData
 */
export function replaceGLTFModelData(objectData, sceneData) {
  const { id, imageFile, matrix, modelFile, modelName, } = objectData;
  if (modelFile && modelName) {

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
    const externalObject3d = gltfObjects[modelFile].scene.getObjectByName(modelName);
    const geometry = externalObject3d.geometry.toJSON();
    sceneData.geometries.push(geometry);

    // replace object data
    objectData.castShadow = true;
    objectData.geometry = geometry.uuid;
    objectData.layers = 1;
    objectData.material = material.uuid;
    objectData.matrix = matrix;
    objectData.name = id;
    objectData.receiveShadow = true;
    objectData.uuid = id,
    objectData.type = 'Mesh';
  }
}
