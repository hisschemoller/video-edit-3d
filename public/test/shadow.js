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

const width = 640,
  height = 480,
  fieldOfView = 23,
  camPosition = [0, 2, 70],
  camTarget = [0, 2, 0],
  cameraTarget = new Vector3(...camTarget);

// RENDERER
const renderer = new WebGLRenderer({antialias: true, alpha: true});
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
const camera = new PerspectiveCamera(fieldOfView, width / height, near, far);
camera.position.set(...camPosition);
camera.lookAt(cameraTarget);
camera.name = 'camera';

// SCENE
const scene = new Scene();
// scene.background = new Color(0xdeebf9);
// scene.fog = new Fog( 0x59472b, 1000, FAR );

// LIGHTS
const directionalLightOffset = new Vector3(6, 7, 5);
const d = 5;
const light = new DirectionalLight(0xffffff, 1);
light.position.copy(directionalLightOffset);
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

// TARGET
const target = new Object3D();
target.position.set(0, 0, -10);
scene.add(target); 

light.target = target;

light.position.copy(target.position);
light.position.add(directionalLightOffset);

console.log('light', light);
console.log('cam', light.shadow.camera);

// LIGHTCAMERAHELPER
const lightCamHelper = new CameraHelper(light.shadow.camera);
scene.add(lightCamHelper);

// GRID
const grid = new GridHelper(20, 20, 0x999, 0xcccccc);
grid.position.set(0, 0, 0);
scene.add(grid);
  
// AXES
const axesHelper = new AxesHelper(10);
scene.add(axesHelper);
  
// ORBIT CONTROL
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target = cameraTarget;
orbit.update();
  
// STATS
const stats = new Stats();
container.appendChild(stats.dom);

// ANIMATION LOOP
const animate = () => {
  stats.update();

  target.position.z -= 0.01;
  light.position.copy(target.position);
  light.position.add(directionalLightOffset);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
