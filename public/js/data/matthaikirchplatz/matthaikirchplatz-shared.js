import { LoopOnce } from '../../lib/three/build/three.module.js';
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

export function addLady(scene, actorStart, x0, x1, y, z, h, vy) {
  createActor(scene, fps, {
    gw: 1.3, gh: h,
    keys: [
      { t:  0 + actorStart, v: [ x0, y, z]},
      { t: 17 + actorStart, v: [ x1, y, z]},
    ],
    cSz: 512, cSc: 512/2.5, cOf: 0,
    vSc: 512/76,
    vt: [0, 60],
    vKeys: [
      { t:  0 + actorStart, v: [ -90 + 25, vy]},
      { t: 15 + actorStart, v: [ 480 + 25, vy ]},
    ],
    vrid: 'mkp_woman_preview',
  });
}
