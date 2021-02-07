import { fps, } from './plstmichel-shared.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { Euler, LoopOnce, LoopRepeat, Quaternion } from '../../lib/three/build/three.module.js';

const y = 0;
const speed = 1; // 3d unit per second

export default function createCamera(scene) {
  const startPositionKey = {t: 0, v: [0, y, -10]};
  const cameraId = createActor(scene, fps, {
    keys: [startPositionKey],
    geom: { w: 0.25, h: 1, d: 2, },
  });

  const vector3Keys = [{
    time: startPositionKey.t * fps,
    value: [ ...startPositionKey.v ],
  }];

  const angle = Math.PI * -0.5;
  const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
  const quaternionKeys = [{
    time: startPositionKey.t * fps,
    value: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
  }];

  lineTo(vector3Keys, quaternionKeys, -5, -10);
  lineTo(vector3Keys, quaternionKeys, -5, -15);
  lineTo(vector3Keys, quaternionKeys, 5, -15);
  lineTo(vector3Keys, quaternionKeys, 0, -10);

  scene.animations[0].tracks.push({
    name: `${cameraId}.position`,
    type: 'vector3',
    keys: vector3Keys,
  });

  scene.animations[0].tracks.push({
    name: `${cameraId}.quaternion`,
    type: 'quaternion',
    keys: quaternionKeys,
  });
}

function lineTo(vector3Keys, quaternionKeys, x, z) {
  const {value: prevValue, time: prevTimeFPS} = vector3Keys[vector3Keys.length - 1];
  const [prevX, prevY, prevZ] = prevValue;
  const distance = Math.sqrt((x - prevX) ** 2 + (z - prevZ) ** 2);
  const duration = distance * speed;
  const endTimeFPS = prevTimeFPS + (duration * fps);
  vector3Keys.push({ time: endTimeFPS, value: [x, y, z] });

  const angle = Math.atan2(x - prevX, z - prevZ);
  const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
  quaternionKeys.push({
    time: prevTimeFPS + 1,
    value: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
  });
  quaternionKeys.push({
    time: endTimeFPS,
    value: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
  });
}
