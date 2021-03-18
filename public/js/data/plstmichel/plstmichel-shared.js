import { Euler, LoopOnce, Matrix4 } from '../../lib/three/build/three.module.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';


export const fps = 15;

export const PREVIEW_SCALE = 0.25;

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
      duration: lifespan[1] - lifespan[0],
      fps,
      loop: LoopOnce,
      name: 'scene-animation',
      tracks: [],
    }];
  }

  return scene;
}

/**
 * Create matrix from rotation, scale and position.
 * @param {Object} [conf={}]
 * @returns {Matrix4}
 */
export function getMatrix(conf = {}) {
  const { x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0, } = conf;
  const scaleMatrix = new Matrix4().makeScale(sx, sy, sz);
  const rotationMatrix = new Matrix4().makeRotationFromEuler(new Euler(rx, ry, rz));
  const matrix4 = new Matrix4().multiplyMatrices(scaleMatrix, rotationMatrix);
  matrix4.setPosition(x, y, z);
  return matrix4;
}
