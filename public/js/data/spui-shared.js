import { uuidv4, } from '../app/util.js';

export const fps = 15;

export function getDefaultScene(lifespan, sceneId, hasAnimations) {
  const scene = {
    animations: [],
    assets: {},
    canvases: {},
    clipId: uuidv4(),
    external3DModels: [],
    geometries: [],
    images: [],
    lifespan: [ ...lifespan ],
    materials: [
      {
        color: 0xf7f7f7,
        type: 'MeshPhongMaterial',
        uuid: 'default-mat',
      },
    ],
    media: {},
    metadata: {
      generator: 'video-edit-3d',
      type: 'Object',
      version: 4.3,
    },
    object: {
      type: 'Group',
      name: `scene_${sceneId}`,
      uuid: `scene_${sceneId}`,
      children: [],
    },
    textures: [],
  };

  if (hasAnimations) {
    scene.animations = [{
      duration: 90,
      fps,
      loop: LoopOnce,
      name: 'scene-animation',
      tracks: [],
    }];
  }

  return scene;
}
