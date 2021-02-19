import { fps, } from './plstmichel-shared.js';
import { uuidv4, } from '../../app/util.js';
import createActor from '../../app/actor.js';
import { Euler, LoopOnce, LoopRepeat, Quaternion } from '/scripts/three/build/three.module.js';

/**
 * Create an object in the data that animates along a path of straight and curved segments.
 * All these segments combine in one big VectorKeyframeTrack.
 * 
 * Direction angles:
 * left (-x): Math.PI * -0.5
 * right (x): Math.PI * 0.5
 * away (-z): Math.PI
 * closer (x): 0
 * 
 * Points along a bezier curve:
 * https://clarle.github.io/yui3/yui/docs/anim/curve.html
 * https://stackoverflow.com/questions/34681457/html5-canvas-bezier-curve-get-all-the-points
 */

const NUM_SEGMENTS = 10;
const y = 1.8;
const speed = 2; // 3d units per second

export default function createCamera(scene) {

  // create the camera parent object
  const cameraId = createActor(scene, fps, {
    geom: { w: 0.25, h: 1, d: 2, },
    objectId: 'cameraParent',
  });
  const vector3Keys = [];
  const quaternionKeys = [];

  moveTo(vector3Keys, quaternionKeys, 0, -10, 1);
  lineTo(vector3Keys, quaternionKeys, 0, -30);
  curveTo(vector3Keys, quaternionKeys, {x: -10, z: -40}, {x: -0, z: -35}, {x: -5, z: -40});
  lineTo(vector3Keys, quaternionKeys, -20, -40);
  curveTo(vector3Keys, quaternionKeys, {x: -30, z: -30}, {x: -25, z: -40}, {x: -30, z: -35});
  lineTo(vector3Keys, quaternionKeys, -30, 30);
  curveTo(vector3Keys, quaternionKeys, {x: -20, z: 40}, {x: -30, z: 35}, {x: -25, z: 40});
  lineTo(vector3Keys, quaternionKeys, 30, 40);

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

/**
 * Animate along bezier curve.
 * @param {Array} vector3Keys 
 * @param {Array} quaternionKeys
 * @param {Object} endPoint Bezier curve endpoint.
 * @param {Object} controlPt1 Bezier curve control point 1.
 * @param {Object} controlPt2 Bezier curve control point 2.
 */
function curveTo(vector3Keys, quaternionKeys, endPoint, controlPt1, controlPt2) {
  const {value: prevValue, time: prevTimeFPS} = vector3Keys[vector3Keys.length - 1];
  const [prevX, prevY, prevZ] = prevValue;
  const startPoint = { x: prevX, z: prevZ };
  let prevPoint = startPoint;
  let totalSegmentsLength = 0;
  let segmentStartTimeFPS = prevTimeFPS;
  for (let i = 0; i <= NUM_SEGMENTS; i++) {
    const percent = i / NUM_SEGMENTS;
    const point = getCubicBezierXYatPercent(startPoint, controlPt1, controlPt2, endPoint, percent);
    const segmentLength = Math.sqrt((point.x - prevPoint.x) ** 2 + (point.z - prevPoint.z) ** 2);
    const duration = segmentLength * (1 / speed);
    const timeFPS = segmentStartTimeFPS + (duration * fps);
    vector3Keys.push({ time: timeFPS, value: [point.x, y, point.z] });

    prevPoint = point;
    segmentStartTimeFPS = timeFPS;
    totalSegmentsLength += segmentLength;
  }

  const angle = Math.atan2(endPoint.x - controlPt2.x, endPoint.z - controlPt2.z);
  const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
  quaternionKeys.push({
    time: segmentStartTimeFPS,
    value: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
  });
}

/**
 *
 *
 * @param {*} vector3Keys
 * @param {*} quaternionKeys
 * @param {*} x
 * @param {*} z
 */
function lineTo(vector3Keys, quaternionKeys, x, z) {
  const {value: prevValue, time: prevTimeFPS} = vector3Keys[vector3Keys.length - 1];
  const [prevX, prevY, prevZ] = prevValue;
  const distance = Math.sqrt((x - prevX) ** 2 + (z - prevZ) ** 2);
  const duration = distance * (1 / speed);
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

/**
 *
 *
 * @param {*} vector3Keys
 * @param {*} quaternionKeys
 * @param {*} x
 * @param {*} z
 * @param {*} a
 */
function moveTo(vector3Keys, quaternionKeys, x, z, a) {
  const startTimeFPS = vector3Keys.length ? vector3Keys[vector3Keys.length - 1].time : 0;
  vector3Keys.push({
    time: startTimeFPS,
    value: [ x, y, z ],
  });

  const angle = a * Math.PI;
  const quaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0)).normalize();
  quaternionKeys.push({
    time: startTimeFPS,
    value: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
  });
}

/**
 * Given the 4 control points on a Bezier curve
 * get x,y at interval T along the curve (0<=T<=1).
 * The curve starts when T==0 and ends when T==1.
 * @param {Object} startPt
 * @param {Object} controlPt1
 * @param {Object} controlPt2
 * @param {Object} endPt
 * @param {Number} percent
 * @returns {Object} Point.
 */
function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
  const x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  const z = CubicN(percent, startPt.z, controlPt1.z, controlPt2.z, endPt.z);
  return ({ x, z });
}

/**
 * Cubic helper formula.
 * @param {Number} T Position along the curve, normalized.
 * @param {Number} a Start point.
 * @param {Number} b Control point 1.
 * @param {Number} c Control point 2.
 * @param {Number} d End point.
 * @returns {Number}
 */
function CubicN(T, a, b, c, d) {
  const t2 = T * T;
  const t3 = t2 * T;
  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}
