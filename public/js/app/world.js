import { setup as setupPopulation, animate as animatePopulation, } from './population.js';
import createExtrude, { createExtrudeGeometryOnly, } from './extrude.js';
import { createCanvases as createSceneCanvases } from './canvas.js';

const {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  AxesHelper,
  BoxGeometry,
  Clock,
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  InterpolateLinear,
  Mesh,
  MeshPhongMaterial,
  ObjectLoader,
  OrbitControls,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  TransformControls,
  Vector3,
  VectorKeyframeTrack,
  WebGLRenderer } = THREE;

let renderer, camera, scene, mixer, clock, stats, actions;

/**
 * Set up an empty 3D world.
 * @param {Object} data 
 */
export function setup(data) {
  createWorld(data);
  createLights();
  setTimeout(() => {
    console.log('scene', scene.toJSON());
  }, 1000);
}

export function createObject(objectId, data) {
  switch (data.type) {
    case 'canvas-extrude':
      const mesh = createExtrude(objectId, data);
      scene.add(mesh);
      break;
  }
}

export function destroyObject(objectId) {
  const mesh = scene.getObjectByName(objectId);
  scene.remove(mesh);
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

  // Create 3D from data and add to scene
  const loader = new ObjectLoader();
  loader.parse(sceneData, model => {
    scene.add(model);

    // postprocess: replace each placeholder mesh with the custom extrude
    addCustomExtrudeMeshes(model, sceneData);

    // remove the placeholders
    while (model.getObjectByName('placeholder')) {
      model.remove(model.getObjectByName('placeholder'));
    }

    // prepare texture canvases to be animated 
    createSceneCanvases(allData, sceneIndex, model);

    // start animation
    mixer = new AnimationMixer(model);
    mixer.clipAction(model.animations[0]).play();

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
  const { children, geometry, uuid: Object3dUuid, } = object3D;

  if (geometry) {
    const { name, uuid: geomUuid, } = geometry;
    if (name === 'CanvasExtrudeGeometry') {
      const { canvasId, depth, points, } = sceneData.origGeoms.find(geomData => geomData.uuid === geomUuid);
      const canvasData = sceneData.canvases[canvasId];
      const mesh = createExtrude(Object3dUuid, { canvasData, depth, points, position: object3D.position, rotation: object3D.rotation, });
      mesh.position.add(object3D.position);
      mesh.rotation.copy(object3D.rotation);
      object3D.parent.add(mesh);
      object3D.name = 'placeholder';
    }
  }

  children.forEach(childObject3d => addCustomExtrudeMeshes(childObject3d, sceneData));
}

/**
 * Create an empty world with camera and helpers.
 * @param {Object} data 
 */
function createWorld(data) {
  const { camera: cam = {}, settings = {}, } = data;
  const { height = 360, width = 640, } = settings;
  const { fieldOfView = 23, position: camPosition = [0, 2, 16], target: camTarget = [0, 2, 0] } = cam;
  const cameraTarget = new Vector3(...camTarget);

  // RENDERER
  renderer = new WebGLRenderer({antialias: true});
  renderer.setClearColor(0xeeeeee);
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

  // SCENE
  scene = new Scene();
  scene.background = new Color(0xeeeeee);
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
function createLights() {
  const ambient = new AmbientLight(0x999999);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xeeeeee, 1, 100);
  light.position.set(3, 9, 6);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;  // default 512
  light.shadow.mapSize.height = 2048; // default 512
  light.shadow.camera.near = 0.5;    // default 0.5
  light.shadow.camera.far = 500;     // default 500
  scene.add(light);
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
  mixer.update(clock.getDelta());
  // camera.translateZ(-0.01);
  stats.update();
  renderer.render(scene, camera);
}
