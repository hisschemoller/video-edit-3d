import { 
  AdditiveAnimationBlendMode, 
  Euler, 
  InterpolateSmooth, 
  Matrix4, 
  LoopOnce, 
  LoopRepeat, 
  Quaternion,
  Vector3,
} from '../../lib/three/build/three.module.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';


export const fps = 10;

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

/**
 *
 *
 * @export
 * @param {Object} scene
 * @param {String} id
 * @param {Number} duration
 * @param {number} [angle=1.75]
 * @param {number} [baseAngle=0]
 * @param {number} [rotate=0]
 */
export function addLeftRightAnimation(scene, id, duration, angle = 1.75, baseAngle = 0, rotate = 0) {
  let angles;
  switch (rotate) {
    case 1:
      baseAngle = 0;
      angles = [0, 0.5, 1, -0.5, 0];
      break;
    case -1:
      baseAngle = 0;
      angles = [0, -0.5, 1, 0.5, 0];
      break;
    default:
      angles = [angle, -angle, angle];
      break;
  }
  const keys = [];
  for (let i = 0, n = angles.length; i < n; i++) {
    const normal = i / (n - 1);
    const angle = (baseAngle + angles[i]) * Math.PI;
    const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
    keys.push({
      time: normal * duration * fps,
      value: [ quaternion.x, quaternion.y, quaternion.z, quaternion.w ],
    });
  }
  const animationClip = {
    duration,
    fps,
    loop: LoopRepeat,
    name: `animation-${id}`,
    tracks: [
      {
        name: `${id}.quaternion`,
        keys,
        type: 'quaternion',
      }
    ],
  };
  scene.animations.push(animationClip);
}
