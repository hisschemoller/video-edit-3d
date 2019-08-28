import { dispatch, getActions, STATE_CHANGE, } from '../store/store.js';

const { 
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  MeshLambertMaterial,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  SphereBufferGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} = THREE;

let camera,
  canvasRect,
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
}
  
/**
 * Add event listeners.
 */
function addEventListeners() {
  document.addEventListener(STATE_CHANGE, onStateChange);
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
}

/**
 * Create the 3D scene, lights, cameras.
 */
function setupWebGLWorld() {
  rootEl = document.querySelector('#canvas-container');
  
  renderer = new WebGLRenderer({antialias: true});
  renderer.setClearColor(0xeeeeee);
  
  rootEl.appendChild(renderer.domElement);


}
