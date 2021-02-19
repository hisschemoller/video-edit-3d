import {
  Camera,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  Scene,
  Texture,
  TextureLoader,
} from '../lib/three/build/three.module.js';

const
  canvasOffsetX = 0,
  canvasOffsetY = 0,
  canvasHeight = 512,
  canvasWidth = 512,
  canvasScale = 256;

let 
  backgroundCamera, 
  backgroundScene,
  end,
  fps,
  hasBackgroundImage = false,
  hasBackgroundVideo = false,
  img,
  imgURLNr = 1,
  imgURLNrFirst,
  imgURLNrLast,
  imgURLNrIncrease = 1,
  imgURLPrefix,
  imgURLSuffix,
  resourceFPS,
  start = 0,
  texture,
  textureCtx;

/**
 * Load a video frame image based on imgURLNr.
 */
function loadImage(){
  if (imgURLNr <= imgURLNrLast) {
    img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + Math.round(imgURLNr)).slice(-5) : '99999') + imgURLSuffix;
    if (imgURLNr < imgURLNrLast) {
      imgURLNr = Math.min(imgURLNr + imgURLNrIncrease, imgURLNrLast);
    } else {
      imgURLNr = imgURLNrFirst;
    }
  }
}

/**
 * 
 * @param {Object} renderer WebGL 3D renderer.
 */
export function renderBackground(renderer) {
  if (hasBackgroundVideo) {
    if (img) {
      textureCtx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      texture.needsUpdate = true;
      renderer.render(backgroundScene , backgroundCamera);
      loadImage(); 
    }
  } else if (hasBackgroundImage) {
    renderer.render(backgroundScene , backgroundCamera);
  }
}

/**
 * 
 * @param {Object} data 
 */
export function setupBackground(data) {
  const { resources, settings, } = data;
  const { backgroundImage, backgroundVideoResourceId, backgroundVideoStartTime, backgroundVideoEndTime, fps, } = settings;
  hasBackgroundImage = !!backgroundImage;
  hasBackgroundVideo = !!backgroundVideoResourceId;
  start = backgroundVideoStartTime;
  end = backgroundVideoEndTime;

  if (hasBackgroundVideo) {
    
    // create canvas
    const canvasEl = document.createElement('canvas');
    canvasEl.width = canvasWidth;
    canvasEl.height = canvasHeight;

    // get context
    textureCtx = canvasEl.getContext('2d');
    textureCtx.fillStyle = '#ffaa66';
    textureCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    // create texture
    texture = new Texture(canvasEl);
    texture.needsUpdate = true;

    // create image
    img = new Image();

    // video resource data
    const resourceData = resources.find(resource => resource.id === backgroundVideoResourceId);
    const {
      frames: resourceFrames = 0, 
      url: resourceURL = '#', 
    } = resourceData;

    ({
      fps: resourceFPS,
    } = resourceData);

    imgURLPrefix = resourceURL.split('#')[0];
    imgURLSuffix = resourceURL.split('#')[1];
    imgURLNr = Math.floor(start * resourceFPS) + 1;
    imgURLNrFirst = Math.floor(start * resourceFPS) + 1;
    imgURLNrLast = end ? Math.min(resourceFrames, Math.floor(end * resourceFPS)) : resourceFrames;
    imgURLNrIncrease = resourceFPS / fps;

    loadImage();
    
  } else if (hasBackgroundImage) {
    texture = new TextureLoader().load(`../img/${backgroundImage}`);
  }

  if (hasBackgroundVideo || hasBackgroundImage) {
    const geometry = new PlaneBufferGeometry(2, 2, 0);
    const material = new MeshBasicMaterial({ map: texture, });
    const mesh = new Mesh(geometry, material);
    mesh.material.depthTest = false;
    mesh.material.depthWrite = false;
  
    // background scene
    backgroundCamera = new Camera();
    backgroundScene = new Scene();
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(mesh);
  }
}
