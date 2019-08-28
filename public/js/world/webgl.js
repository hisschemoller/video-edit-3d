import { dispatch, getActions, STATE_CHANGE, } from '../store/store.js';

const { 
  AmbientLight,
  AxesHelper,
  Clock,
  Color,
  DirectionalLight,
  GridHelper,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  OrbitControls,
  PCFShadowMap,
  PerspectiveCamera,
  Plane,
  PlaneBufferGeometry,
  Raycaster,
  Scene,
  SphereBufferGeometry,
  TransformControls,
  Vector2,
  Vector3,
  WebGLRenderer,
} = THREE;

let camera,
  canvasRect,
  clock,
  collideGlobe,
  intersection,
  isMapMode = false,
  isPlaying = false,
  mousePoint,
  orbitControls,
  plane,
  raycaster,
  renderer,
  rootEl,
  scene;

/**
 * General setup of the module.
 */
export function setup() {
  setupWebGLWorld();
  addEventListeners();
  createLights();
  createGround();
  createBox();
  draw();
}

/**
 * Add event listeners.
 */
function addEventListeners() {
  document.addEventListener(STATE_CHANGE, onStateChange);
}

/**
 * Box.
 */
function createBox() {
  const { BoxGeometry, } = THREE;
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({color: 0xcccccc});
  const box = new Mesh(geometry, material);
  box.position.set(0, 0.5, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);
}

/**
 * Ground plane.
 */
function createGround() {
  const defaultWidth = 20;
  const defaultDepth = 20;
  
  const geometry = new PlaneBufferGeometry(defaultWidth, defaultDepth);
  const material = new MeshPhongMaterial({color: 0xf7f7f7});

  const ground = new Mesh(geometry, material);
  ground.position.set(0, 0, 0);
  ground.rotation.x = - Math.PI / 2;
  ground.scale.set(1, 1, 1);
  ground.castShadow = false;
  ground.receiveShadow = true;
  scene.add(ground);
}

/**
 * Lights.
 */
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

/**
 * Update the physics world and render the results in 3D.
 */
function draw() {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
}

/**
 * App's state has changed.
 * @param {Object} e CustomEvent from Store when state has been updated.
 */
function onStateChange(e) {
  const { state, action, actions, } = e.detail;
  switch (action.type) {

    case actions.SET_PROJECT:
      setCanvasSize(state);
      break;
  }
}

/**
 * Create the 3D scene, lights, cameras.
 */
function setCanvasSize(state) {
  const { canvasHeight, canvasWidth, } = state;
  renderer.setSize(canvasWidth, canvasHeight);
  canvasRect = renderer.domElement.getBoundingClientRect();
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();

  // move camera further back when viewport height increases so objects stay the same size 
  let scale = 0.01; // 0.15;
  let fieldOfView = camera.fov * (Math.PI / 180); // convert fov to radians
  let targetZ = canvasRect.height / (2 * Math.tan(fieldOfView / 2));
  camera.position.set(camera.position.x, camera.position.y, targetZ * scale);
}

/**
 * Create the 3D scene, lights, cameras.
 */
function setupWebGLWorld() {
  const defaultWidth = 400;
  const defaultHeight = 400;
  
  // RENDERER
  renderer = new WebGLRenderer({antialias: true});
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(defaultWidth, defaultHeight);
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap; // PCFSoftShadowMap

  // DOM ELEMENT
  const container = document.getElementById('canvas-container');
  container.appendChild(renderer.domElement);

  // SCENE
  scene = new Scene();
  scene.background = new Color(0xeeeeee);
  // scene.fog = new Fog( 0x59472b, 1000, FAR );

  // CAMERA
  const fieldOfView = 23;
  const near = 1;
  const far = 1000;
  camera = new PerspectiveCamera(fieldOfView, defaultWidth / defaultHeight, near, far);
  // camera.position.set(0, 2, 16);
  // camera.lookAt(new Vector3(0, 2, 0));

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
  // orbit.target = new Vector3(0, 2, 0);
  orbit.update();
  
  // TRANSFORM CONTROL
  const control = new TransformControls(camera, renderer.domElement);
}
