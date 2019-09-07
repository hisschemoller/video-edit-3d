import { getObjectByName } from './world.js';
import { create as createBarsAnimation } from './bars-animation.js';
import { create as createVideoAnimation } from './video-animation.js';

/**
 * 
 */

const animations = [];


export function setup(settings) {
  const { objects = [], resources = [], fps = 30, } = settings;

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

function setupVideoCanvas(data, texture, canvas, resources, fps) {
  animations.push({
    animation: createVideoAnimation(canvas, data, resources, texture, fps),
    texture,
  });
}

export function draw(frame) {
  animations.forEach(animation => {
    animation.animation.draw(frame);
    animation.texture.needsUpdate = true;
  });
}
