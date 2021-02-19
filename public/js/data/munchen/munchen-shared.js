import { LoopOnce } from '/scripts/three/build/three.module.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';

export const fps = 15;

export function getDefaultScene(lifespan, sceneNumber, hasAnimations) {
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
    metadata: {
      generator: 'video-edit-3d',
      type: 'Object',
      version: 4.3,
    },
    object: {
      type: 'Group',
      name: `scene${sceneNumber}`,
      uuid: `scene${sceneNumber}`,
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
