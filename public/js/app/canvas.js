import { getObjectByName } from './world.js';
import { create as createBarsAnimation } from './bars-animation.js';
import { create as createVideoAnimation } from './video-animation.js';

/**
 * 
 */
const animations = [];

/**
 * 
 * @param {Object} data The complete configuration data.
 */
export function setup(data) {
  const { objects = [], resources = [], fps = 30, } = data;

  for (let id in objects) {
    const data = objects[id];
    const object3d = getObjectByName(id);
    const texture = object3d.material.map;
    const canvas = texture.image;
    
    if (data.animation) {
      setupAnimationCanvas(data, texture, canvas);
    } else if (data.video) {
      setupVideoCanvas(data, texture, canvas, resources, fps);
    } else if (data.image) {
      setupImageCanvas(data, texture, canvas);
    }
  }
}

/**
 * Create all canvases the textures used in a scene.
 */
export function createCanvases(allData, sceneIndex, rootObject3d) {
  const objectData = allData.score[sceneIndex].object;
  recurseObjects(objectData, allData, sceneIndex, rootObject3d);
}

/**
 * Find all object data recursively.
 * @param {Object} objectData 
 * @param {Object} allData
 */
function recurseObjects(objectData, allData, sceneIndex, rootObject3d) {
  const { children = [], geometry: geometryId, uuid, } = objectData;
  if (geometryId) {
    const { canvases, geometries, origGeoms, videos, } = allData.score[sceneIndex];
    const { canvasId, videoId, } = origGeoms.find(geomData => geomData.uuid === geometryId);
  
    if (canvasId) {
  
      // get the mesh texture canvas
      const object3d = rootObject3d.getObjectByName(objectData.uuid);

      if (object3d.material) {
        const texture = object3d.material.map;
        const canvas = texture.image;
    
        if (videoId) {
          const { settings, resources, } = allData;
          const { fps, } = settings;
          const data = {
            canvasData: canvases[canvasId],
            flipHorizontal: false,
            videoData: videos[videoId],
          };
          setupVideoCanvas(data, texture, canvas, resources, fps);
        }
      }
    }
  }
  
  children.forEach(childObjectData => recurseObjects(childObjectData, allData, sceneIndex, rootObject3d));
}

/**
 * 
 * @param {*} data 
 * @param {*} texture 
 * @param {*} canvas 
 */
function setupAnimationCanvas(data, texture, canvas) {
  switch (data.animation.type) {
    case 'bars':
      animations.push({
        animation: createBarsAnimation(canvas, data),
        texture,
      });
      break;
  }
}

/**
 * 
 * @param {*} data 
 * @param {*} texture 
 * @param {*} canvas 
 */
function setupImageCanvas(data, texture, canvas) {
  const ctx = canvas.getContext('2d');
  if (data.image) {
    const { canvas, image } = data;
    const { file, width, height, offsetX = 0, offsetY = 0, scale = 1 } = image;
    const img = new Image();
    img.src = `img/${file}`;
    img.onload = () => {
      if (scale === 1) {
        const dx = canvas.offsetX - offsetX;
        const dy = canvas.offsetY + offsetY - height;
        ctx.drawImage(img, dx, dy);
      } else {
        const dx = canvas.offsetX - (offsetX * scale);
        const dy = canvas.offsetY + ((offsetY - height) * scale);
        const dWidth = width * scale;
        const dHeight = height * scale;
        ctx.drawImage(img, dx, dy, dWidth, dHeight);
      }
      texture.needsUpdate = true;
    };
  } 
}

/**
 * 
 * @param {*} data 
 * @param {*} texture 
 * @param {*} canvas 
 * @param {*} resources 
 * @param {*} fps 
 */
function setupVideoCanvas(data, texture, canvas, resources, fps) {
  animations.push({
    animation: createVideoAnimation(canvas, data, resources, texture, fps),
    texture,
  });
}

/**
 * 
 * @param {*} frame 
 */
export function draw(frame) {
  animations.forEach(animation => {
    animation.animation.draw(frame);
    animation.texture.needsUpdate = true;
  });
}
