import createExtrude, { createCanvasTexture, createExtrudeGeometry, createExtrudeMesh, } from './extrude.js';
import { createCanvases as createSceneCanvases } from './canvas.js';

const {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  BoxGeometry,
  CameraHelper,
  Clock,
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  InterpolateLinear,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  ObjectLoader,
  OrbitControls,
  OrthographicCamera,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  TransformControls,
  Vector3,
  VectorKeyframeTrack,
  WebGLRenderer } = THREE;

let renderer, camera, directionalLightOffset, light, lightTarget, cameraSpeed, scene, clock, stats, actions,
  mixers = [];

/**
 * Set up an empty 3D world.
 * @param {Object} data 
 */
export function setup(data) {
  createWorld(data);
  createLights(data);
  setTimeout(() => {
    console.log('scene', scene.toJSON());
  }, 1000);
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
  const getObjectNamesInScene = (objData, arr) => {
    const { children = [], name } = objData;
    arr.push(name);
    children.forEach(childObjData => getObjectNamesInScene(childObjData, arr));
    return arr;
  };
  const names = getObjectNamesInScene(sceneData.object, []).reverse();

  // end animations
  const mixer = mixers.find(mixer => mixer[1] === sceneId);
  mixer[0].stopAllAction();
  mixers.splice(mixers.indexOf(mixer), 1);
  
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
}

export function getObjectByName(name) {
  return scene.getObjectByName(name);
}

/**
 * Create all 3D objects and populate the scene.
 * @param {Object} sceneData 
 */
export function loadScene(allData, sceneIndex) {

  // preprocess: replace the custom extrude geometry data with regular data
  const sceneData = allData.score[sceneIndex];
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

    // apply custom convenience settings to avoid direct matrix4 settings
    const recurseObjectTree = (objectData) => {
      const { children = [], name, rotateY = 0, } = objectData;
      model.getObjectByName(name).rotateY(rotateY);
      children.forEach(childObjectData => recurseObjectTree(childObjectData));
    };
    recurseObjectTree(sceneData.object);

    // prepare texture canvases to be animated 
    createSceneCanvases(allData, sceneIndex, model);

    // start animation
    if (model.animations && model.animations.length) {
      const mixer = new AnimationMixer(model);
      mixer.addEventListener('loop', e => { console.log('loop', e)});
      mixer.addEventListener('finished', e => { console.log('finished', e)});
      const animationAction = mixer.clipAction(model.animations[0]);
      animationAction.setLoop(sceneData.animations[0].loop);
      animationAction.play();
      mixers.push([mixer, sceneData.clipId]);
      console.log('AnimationMixer', mixer);
      // console.log('clipAction', animationAction);
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
  const { fieldOfView = 23, position: camPosition = [0, 2, 16], speed = 0, target: camTarget = [0, 2, 0] } = cam;
  const cameraTarget = new Vector3(...camTarget);
  cameraSpeed = speed;

  // RENDERER
  renderer = new WebGLRenderer({antialias: true, alpha: true});
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

  // SCENE
  scene = new Scene();
  // scene.background = new Color(0xdeebf9);
  // scene.fog = new Fog( 0x59472b, 1000, FAR );

  // CLOCK
  clock = new Clock();

  // GRID
  const grid = new GridHelper(20, 20, 0xcccccc, 0xcccccc);
  grid.position.set(0, 0, 0);
  scene.add(grid);
  
  // AXES
  const axesHelper = new AxesHelper(10);
  scene.add(axesHelper);
  
  // ORBIT CONTROL
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.target = cameraTarget;
  orbit.update();
  
  // TRANSFORM CONTROL
  // const control = new TransformControls(camera, renderer.domElement);
  
  // STATS
  stats = new Stats();
  container.appendChild(stats.dom);
}

// LIGHTS
function createLights(data) {
  directionalLightOffset = new Vector3(6, 7, 5);

  // AMBIENT
  const ambient = new AmbientLight(0xffffff, 0.6); // color = 0xffffff, intensity = 1
  scene.add(ambient);

  // LIGHT_TARGET
  lightTarget = new Object3D();
  lightTarget.position.set(0, 0, -10);
  scene.add(lightTarget); 

  // DIRECTIONAL
  const d = 5;
  light = new DirectionalLight(0xffffff, 1); // color = 0xffffff, intensity = 1
  light.position.copy(directionalLightOffset);
  light.target = lightTarget;
  light.castShadow = true;
  light.shadow.mapSize.width = 512;  // default 512
  light.shadow.mapSize.height = 512; // default 512
  light.shadow.camera.near = 0.5;    // default 0.5
  light.shadow.camera.far = 500;     // default 500
  light.shadow.camera.bottom = -d; // default 5
  light.shadow.camera.left = -d; // default 5
  light.shadow.camera.right = d; // default 5
  light.shadow.camera.top = d; // default 5
  scene.add(light);

  // HELPER
  const helper = new CameraHelper(light.shadow.camera);
  scene.add(helper);
}

// GROUND
function createGround(settings) {
  const { size = {}, } = settings;
  const { width = 10, depth = 10, } = size;
  const geometry = new PlaneBufferGeometry(width, depth);
  const material = new MeshPhongMaterial({color: 0xf7f7f7});

  const ground = new Mesh(geometry, material);
  ground.position.set(0, 0, 0);
  ground.rotation.x = - Math.PI / 2;
  ground.scale.set(1, 1, 1);
  ground.castShadow = false;
  ground.receiveShadow = true;
  scene.add(ground);
}

// ANIMATION LOOP
export function animate() {
  const deltaTime = clock.getDelta();
  mixers.forEach(mixer => mixer[0].update(deltaTime));
  
  camera.translateZ(cameraSpeed);
  lightTarget.translateZ(cameraSpeed);

  // target.position.z -= 0.01;
  light.position.copy(lightTarget.position);
  light.position.add(directionalLightOffset);
  
  stats.update();
  renderer.render(scene, camera);
}
