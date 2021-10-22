import createExtrude, { createCanvasTexture, createExtrudeGeometry, createExtrudeMesh, } from './extrude.js';
import { createCanvases as createSceneCanvases } from './canvas.js';
import { renderBackground, setupBackground } from './world-background.js';
import { loadGLTFFiles, replaceGLTFModelData } from './gltf.js';
import { logMemoryInfo } from './util.js';
import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  BoxGeometry,
  Camera,
  CameraHelper,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  Euler,
  Fog,
  GridHelper,
  ImageUtils,
  InterpolateLinear,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  ObjectLoader,
  OrthographicCamera,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Quaternion,
  Scene,
  Vector3,
  VectorKeyframeTrack,
  WebGLRenderer } from '../lib/three/build/three.module.js';
import { OrbitControls } from '../lib/three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from '../lib/three/examples/jsm/controls/TransformControls.js';
import CSM from '../lib/three-csm/build/three-csm.module.js';

let 
  renderer, 
  camera,
  csm,
  directionalLightOffset, 
  light, lightTarget, 
  cameraSpeed, 
  scene, 
  clock, 
  stats,
  actions,
  mixers = [];

/**
 * Set up an empty 3D world.
 * @param {Object} data 
 */
export async function setup(data) {
  await loadGLTFFiles(data);
  createWorld(data);
  setupBackground(data);
  addLights(data);
}

/**
 * Delete objects, geometries, materials, sto animations.
 *
 * @export
 * @param {Object} allData
 * @param {String} sceneId
 */
export function destroyScene(allData, sceneId) {
  const sceneData = allData.score.find(scene => scene.clipId === sceneId);

  // recursively get the names of all objects in the scene
  const getObjectNamesInScene = (objData, arr) => {
    const { children = [], name } = objData;
    arr.push(name);
    children.forEach(childObjData => getObjectNamesInScene(childObjData, arr));
    return arr;
  };
  const names = getObjectNamesInScene(sceneData.object, []).reverse();

  // end animations
  const mixer = mixers.find(mixer => mixer[1] === sceneId);
  if (mixer) {
    mixer[0].stopAllAction();
    mixers.splice(mixers.indexOf(mixer), 1);
  }
  
  // remove and dispose objects, geometries, materials
  names.forEach(name => {
    const object = scene.getObjectByName(name);
    if (object.geometry) {
      object.geometry.dispose();
    }
    if (object.material) {
      object.material.dispose();
    }
    scene.remove(object);
  });

  // console.info('---------------');
  // console.info('Scene DESTROYED');
  // logMemoryInfo(renderer);
}

/**
 * Search 3D object in scene.
 * @param {String} name 3D object name.
 * @returns
 */
export function getObjectByName(name) {
  return scene.getObjectByName(name);
}

/**
 * Create all 3D objects and populate the scene.
 * @param {Object} allData 
 * @param {Number} sceneIndex 
 * @param {Number} position Time position within the main timeline, in seconds.
 */
export function loadScene(allData, sceneIndex, position) {
  const sceneData = allData.score[sceneIndex];

  // preprocess: replace the custom extrude geometry data with regular data
  sceneData.origGeoms = [ ...sceneData.geometries ];
  sceneData.geometries = sceneData.geometries.map(geomData => {
    if (geomData.type === 'CanvasExtrudeGeometry') {
      
      // create temporary placeholder geometry
      const geometry = new BoxGeometry(1, 1, 1);
      geometry.name = 'CanvasExtrudeGeometry';
      geometry.uuid = geomData.uuid;
      return geometry.toJSON();
    }
    return geomData;
  });

  // preprocess: recurse the scene data object tree to process external model data
  const recurseObjectTree1 = (objectData) => {
    const { children = [], } = objectData;
    replaceGLTFModelData(objectData, sceneData);
    children.forEach(childObjectData => recurseObjectTree1(childObjectData));
  };
  recurseObjectTree1(sceneData.object);

  // ObjectLoader creates 3D objects from data
  const loader = new ObjectLoader();
  loader.parse(sceneData, model => {
    scene.add(model);

    // postprocess: replace each placeholder mesh with the custom extrude
    addCustomExtrudeMeshes(model, sceneData);

    // remove the placeholders
    while (model.getObjectByName('placeholder')) {
      model.remove(model.getObjectByName('placeholder'));
    }

    // recurse the whole object tree
    const recurseObjectTree = (objectData) => {

      // apply custom convenience settings to avoid direct matrix4 settings
      const { children = [], name, rotateX = 0, rotateY = 0, } = objectData;
      model.getObjectByName(name).rotateX(rotateX);
      model.getObjectByName(name).rotateY(rotateY);

      children.forEach(childObjectData => recurseObjectTree(childObjectData));
    };
    recurseObjectTree(sceneData.object);

    // prepare texture canvases to be animated 
    createSceneCanvases(allData, sceneIndex, model);

    // if there's a parent for the camera, attach it
    const { parentName } = allData.camera;
    if (parentName) {
      const cameraParent = model.getObjectByName(parentName);
      if (cameraParent) {
        cameraParent.add(camera);

        // let directionallight follow the camera path.
        const directionalLight = scene.getObjectByName('directionalLight');
        const lightTarget = scene.getObjectByName('lightTarget');
        directionalLight.position.copy(new Vector3(-5, 10, -8));
        cameraParent.add(directionalLight);
        cameraParent.add(lightTarget);
      }
    }

    // start animation
    if (model.animations && model.animations.length) {
      // console.log('model.animations', model.animations);
      const mixer = new AnimationMixer(model);
      // mixer.addEventListener('loop', e => { console.log('loop', e)});
      // mixer.addEventListener('finished', e => { console.log('finished', e)});
      for (let i = 0, n = model.animations.length; i < n; i++) {
        const animationAction = mixer.clipAction(model.animations[i]);
        animationAction.setLoop(sceneData.animations[i].loop);

        // If this is the first scene skip the animation to the given position,
        // because scenes might have been temporary skipped while developing.
        if (sceneIndex === 0) {
          animationAction.time = position; // seconds, set time to start from
        }
        
        animationAction.play();
        // console.log('animationAction', animationAction);
      }
      
      mixers.push([mixer, sceneData.clipId]);
      // console.log('AnimationMixer', mixer);
    }
    
    // programmed animation:

    // const mesh = model.getObjectByName('scene1wallR1');
    // const times = [0, 4];
    // const values = [
    //   0, 0, 0, 
    //   4, 0, 0
    // ];
    // const track = new VectorKeyframeTrack(`${'scene1wallR1'}.position`, times, values, InterpolateLinear);
    // const tracks = [track];
    // const clip = new AnimationClip('testClip', 4, tracks);
    // mixer = new AnimationMixer(mesh);
    // mixer.clipAction(clip).play();


    // console.info('++++++++++++');
    // console.info('Scene LOADED');
    // logMemoryInfo(renderer);
  });
}

/**
 * Add custom extrude geometry meshes. 
 * @param {Object} object3D 
 * @param {Object} sceneData 
 */
function addCustomExtrudeMeshes(object3D, sceneData) {

  // create all canvas textures for the scene
  const textures = Object.keys(sceneData.canvases).reduce((accumulator, canvasId) => {
    return { 
      ...accumulator, 
      [canvasId]: createCanvasTexture(sceneData.canvases[canvasId]),
    };
  }, {});

  // create all the CanvasExtrudeGeometry geometries for the scene
  const geometries = sceneData.origGeoms.reduce((accumulator, geomData) => {
    if (geomData.type === 'CanvasExtrudeGeometry') {
      return { 
        ...accumulator,
        [geomData.uuid]: createExtrudeGeometry(geomData),
      }
    }
    return { ...accumulator, };
  }, {});

  // create all the CanvasExtrudeMesh meshes
  createCustomExtrudeMeshesRecursive(object3D, sceneData.object, sceneData, textures, geometries);
}

/**
 *
 *
 * @param {*} object3D
 * @param {*} sceneData
 * @param {*} textures
 * @param {*} geometries
 */
function createCustomExtrudeMeshesRecursive(rootObject3D, objectData, sceneData, textures, geometries) {
  const { canvasId, children = [], geometry: geometryId, name: object3dName, } = objectData;
  const object3D = scene.getObjectByName(object3dName);

  if (geometryId && geometries[geometryId]) {
    const extrudeGeometry = geometries[geometryId];
    const canvasTexture = textures[canvasId];
    const mesh = createExtrudeMesh(object3dName, extrudeGeometry, canvasTexture);
    mesh.position.add(object3D.position);
    mesh.rotation.copy(object3D.rotation);
    object3D.parent.add(mesh);
    object3D.name = 'placeholder';
  }
  
  children.forEach(childObjectData => createCustomExtrudeMeshesRecursive(rootObject3D, childObjectData, sceneData, textures, geometries));
}

/**
 * Create an empty world with camera and helpers.
 * @param {Object} data 
 */
function createWorld(data) {
  const { camera: cam = {}, settings = {}, } = data;
  const { height = 360, width = 640, } = settings;
  const { 
    fieldOfView = 23,
    position: camPosition = [0, 2, 16],
    rotation: camRotation = [0, 0, 0, 0],
    speed = 0, target:
    camTarget = [0, 2, 0],
  } = cam;
  const cameraTarget = new Vector3(...camTarget);
  cameraSpeed = speed;

  // RENDERER
  renderer = new WebGLRenderer({antialias: true, alpha: false});
  renderer.setClearColor(0xdeebf9, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap; // PCFSoftShadowMap

  // DOM ELEMENT
  const container = document.getElementById('canvas-container');
  container.appendChild(renderer.domElement);

  // CAMERA
  const near = 1;
  const far = 1000;
  camera = new PerspectiveCamera(fieldOfView, width / height, near, far);
  camera.position.set(...camPosition);
  camera.lookAt(cameraTarget);
  camera.name = 'camera';

  // CAMERA rotation
  const matrix = new Matrix4();
  matrix.makeRotationY(camRotation[1]);
  camera.position.applyMatrix4(matrix);

  // SCENE
  scene = new Scene();
  // scene.background = new Color(0xdeebf9);
  // scene.fog = new Fog( 0x59472b, 1000, FAR );

  // CLOCK
  // clock = new Clock();

  // GRID
  // const grid = new GridHelper(5, 5, 0xff0000, 0xff0000);
  // grid.position.set(0, 0, 0);
  // scene.add(grid);
  
  // AXES
  // const axesHelper = new AxesHelper(10);
  // scene.add(axesHelper);
  
  // ORBIT CONTROL
  // const orbit = new OrbitControls(camera, renderer.domElement);
  // orbit.target = cameraTarget;
  // orbit.update();
  
  // TRANSFORM CONTROL
  // const control = new TransformControls(camera, renderer.domElement);
  
  // STATS
  // stats = new Stats();
  // container.appendChild(stats.dom);
}

// LIGHTS
function addLights(data) {
  directionalLightOffset = new Vector3(60, 70, 50);

  // AMBIENT
  const ambient = new AmbientLight(0xffffff, 0.4); // color = 0xffffff, intensity = 1
  scene.add(ambient);

  // LIGHT_TARGET
  lightTarget = new Object3D();
  lightTarget.position.set(0, 0, 0);
  lightTarget.name = 'lightTarget';
  scene.add(lightTarget); 

  // DIRECTIONAL
  const d = 20;
  light = new DirectionalLight(0xffffff, 1); // color = 0xffffff, intensity = 1
  light.position.copy(directionalLightOffset);
  light.name = 'directionalLight';
  light.target = lightTarget;
  light.castShadow = true;
  light.shadow.mapSize.width = 4096; // default 512
  light.shadow.mapSize.height = 4096; // default 512
  light.shadow.camera.near = 0.5; // default 0.5
  light.shadow.camera.far = 500; // default 500
  light.shadow.camera.bottom = -d; // default 5
  light.shadow.camera.left = -d; // default 5
  light.shadow.camera.right = d; // default 5
  light.shadow.camera.top = d; // default 5
  scene.add(light);

  // HELPER
  // const helper = new CameraHelper(light.shadow.camera);
  // scene.add(helper);

  // CASCADED SHADOW MAP
  // csm = new CSM({
  //   maxFar: camera.far,
  //   cascades: 4,
  //   shadowMapSize: 1024,
  //   lightDirection: new Vector3(1, -1, -1).normalize(), // (5, 10, -8),
  //   lightIntensity: 1,
  //   camera: camera,
  //   parent: scene,
  // });
  // let material = new MeshPhongMaterial(); // works with Phong and Standard materials
  // csm.setupMaterial(material); // must be called to pass all CSM-related uniforms to the shader
  // console.log('csm', csm, typeof csm);
}

// ANIMATION LOOP
export function animate(deltaTime) {
  mixers.forEach(mixer => mixer[0].update(deltaTime));
  
  if (cameraSpeed) {
    camera.translateZ(cameraSpeed);
    lightTarget.translateZ(cameraSpeed);

    light.position.copy(lightTarget.position);
    light.position.add(directionalLightOffset);
  }

  // csm.update(camera.matrix);

  // stats.update();

  renderBackground(renderer);

  renderer.render(scene, camera);
}

/**
 * The canvas is required by Player to send its image data to the server.
 * @returns {Object} Canvas DOM element.
 */
export function getCanvas() {
  return renderer.domElement;
}
