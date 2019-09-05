import { setup as setupPopulation, animate as animatePopulation, } from './population.js';

const {
  AmbientLight,
  AxesHelper,
  Clock,
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  Mesh,
  MeshPhongMaterial,
  OrbitControls,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  TransformControls,
  Vector3,
  WebGLRenderer } = THREE;

let renderer, camera, scene, mixer, clock, stats, actions;

export function setup(settings) {
  createWorld(settings);
  createLights();
  // createGround(settings);
  setupPopulation(settings, scene);
}

export function getObjectByName(name) {
  return scene.getObjectByName(name);
}

function createWorld(settings) {
  const { camera: cam = {}, height = 360, width = 640, } = settings;
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
  // stats = new Stats();
  // container.appendChild(stats.dom);
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

// DRAW LOOP
function draw() {
  renderer.render(scene, camera);
}

// ANIMATION LOOP
export function animate() {
  animatePopulation(clock.getDelta());
  // camera.translateZ(-0.1)
  // stats.update();
  renderer.render(scene, camera);
}
