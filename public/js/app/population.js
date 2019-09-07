import createExtrude from './extrude.js';

let animations = [];
let mixer = null;

export function setup(settings, scene) {
  const { objects = [], } = settings;

  for (let id in objects) {
    const data = objects[id];
    switch (data.type) {
      case 'canvas-extrude':
        const mesh = createExtrude(id, data);
        scene.add(mesh);
        break;
    }
  }
}

export function animate(delta) {
  animations.forEach(animation =>{
    animation.mixer.update(delta);
  });
}
