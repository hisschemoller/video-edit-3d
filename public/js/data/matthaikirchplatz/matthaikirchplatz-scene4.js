import { musicToTime, uuidv4, } from '../../app/util.js';
import { addLady, getDefaultScene, fps, } from './matthaikirchplatz-shared.js';
import createActor from '../../app/actor.js';

let actorStart;
const height = 2.3;
const scene = getDefaultScene([ 42 /* 42 */, 75], 4, true);

// hoeveel video pixels per 3d unit?
// 512/2.5 = 204.8 canvas pixels per unit
// 512/76 = 6.7368421052631575 canvas pixels tonen 1 video pixel
// 204.8 / 6.7368421052631575 = 30.400000000000002 video pixels per 3d unit

{
  const actorStart = 0.0, x0 = -10.7, x1 = 11.0, y = -0.5, z = -11.0, h = 1.15, vy = 73;
  addLady( scene, actorStart, x0, x1, y, z, h, vy);
  addLady( scene, actorStart, x0, x1, y + h + 0.5, z, h, vy - (30.400000000000002 * h));
}

{
  // STAPEL VOETEN
  const actorStart = 4.0, x0 = -11, x1 = 13, y = -0.5, z = -15.0, h = 0.4, vy = 73;
  for (let i = 0, n = 7; i < n; i++) {
    addLady( scene, actorStart, x0, x1, y + (i * h), z, h, vy - 3);
  }
}

{
  // KLEIN
  const actorStart = 8.0, x0 = -10.7, x1 = 11.0, y = -0.5, z = -2.0, h = 0.8, vy = 73;
  addLady( scene, actorStart, x0, x1, y, z, h, vy);
  addLady( scene, actorStart, x0, x1, y + h, z, h, vy - (30.400000000000002 * (height - h)));
}

{
  // LANG
  const actorStart = 14.0, x0 = -11.7, x1 = 13.0, y = -0.5, z = -15.0, h = 0.2, vy = 68;
  for (let i = 0, n = 20; i < n; i++) {
    addLady(scene, actorStart, x0, x1, y + (i * (h + 0.2)), z, h, vy - (i * 3));
  }
}

export default scene;
