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
// export function setup(data) {
//   const { objects = [], resources = [], fps = 30, } = data;

//   for (let id in objects) {
//     const data = objects[id];
//     const object3d = getObjectByName(id);
//     const texture = object3d.material.map;
//     const canvas = texture.image;
    
//     if (data.animation) {
//       setupAnimationCanvas(data, texture, canvas);
//     } else if (data.video) {
//       setupVideoCanvas(data, texture, canvas, resources, fps);
//     } else if (data.image) {
//       setupImageCanvas(data, texture, canvas);
//     }
//   }
// }

/**
 * Create all canvases for the textures used in a scene.
 * @param {Object} allData The complete configuration data.
 * @param {Number} sceneIndex Scene index.
 * @param {String} sceneId Scene's sceneData.clipId.
 * @param {Object} rootObject3d 
 */
export function createCanvases(allData, sceneIndex, sceneId, rootObject3d) {
  const objectData = allData.score[sceneIndex].object;
  recurseObjects(objectData, allData, sceneIndex, sceneId, rootObject3d);
}

/**
 * Destroy all canvases for the textures used in a scene.
 * @param {String} sceneId Scene's sceneData.clipId.
 */
export function destroyCanvases(sceneId) {
  let i = animations.length;
  while (i > 0) {
    i--;
    if (animations[i].animation.getSceneId() === sceneId) {
      animations[i].animation.destroy();
      animations.splice(i, 1);
    }
  }
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

/**
 * Find all object data recursively.
 * @param {Object} objectData 
 * @param {Object} allData
 * @param {Number} sceneIndex Scene index.
 * @param {String} sceneId Scene's sceneData.clipId.
 * @param {Object} rootObject3d 
 */
function recurseObjects(objectData, allData, sceneIndex, sceneId, rootObject3d) {
  const { canvasId, children = [], geometry: geometryId, name, } = objectData;
  
  if (geometryId) {
    const { canvases, images, assets, } = allData.score[sceneIndex];
    if (canvasId) {
  
      // get the mesh texture canvas
      const object3d = rootObject3d.getObjectByName(name);

      if (object3d.material) {
        const texture = object3d.material.map;
        const canvas = texture.image;
        const { imageId, videoId, } = canvases[canvasId];
        
        if (videoId) {
          const { settings, resources, } = allData;
          const { fps, } = settings;
          const data = {
            canvasData: canvases[canvasId],
            flipHorizontal: false,
            videoData: assets[videoId],
          };
          setupVideoCanvas(data, texture, canvas, resources, fps, sceneId);
        } else if (imageId) {
          const canvasData = canvases[canvasId];
          const imageData = assets[canvasData.imageId];
          setupImageCanvas(canvasData, imageData, texture, canvas);
        }
      }
    }
  }
  
  children.forEach(childObjectData => recurseObjects(childObjectData, allData, sceneIndex, sceneId, rootObject3d));
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
function setupImageCanvas(canvasData, imageData, texture, canvas) {
  if (canvasData.imageId) {
    const ctx = canvas.getContext('2d');
    const { 
      offsetX: canvasOffsetX = 0, 
      offsetY: canvasOffsetY = 0, 
      width: canvasWidth,
      height: canvasHeight, 
    } = canvasData;
    const { 
      offsetX: imageOffsetX = 0, 
      offsetY: imageOffsetY = 0,
      scale: imageScale = 1,
      file,
    } = imageData;
    
    const img = new Image();
    img.src = `img/${file}`;
    img.onload = () => {
      const { height: imageHeight, width: imageWidth } = img;
      const dx = canvasOffsetX - (imageOffsetX * imageScale);
      const dy = canvasHeight - canvasOffsetY - (imageOffsetY * imageScale);
      const dWidth = imageWidth * imageScale;
      const dHeight = imageHeight * imageScale;
      ctx.drawImage(img, dx, dy, dWidth, dHeight);
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
 * @param {String} sceneId Scene's sceneData.clipId.
 */
function setupVideoCanvas(data, texture, canvas, resources, fps, sceneId) {
  animations.push({
    animation: createVideoAnimation(canvas, data, resources, texture, fps, sceneId),
    texture,
  });
}

/**
 * 
 * @export
 */
export function videoCanvasesLoadImage() {
  animations.forEach(animation => {
    animation.animation.loadImage();
  });
}
