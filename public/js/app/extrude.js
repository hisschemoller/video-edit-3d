const {
  Face3,
  Geometry,
  Mesh,
  MeshPhongMaterial,
  Shape,
  ShapeGeometry,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
} = THREE;

/**
 * Create a mesh with an extruded shape and canvas texture.
 * 
 * @export
 * @param {String} id To use as name of the mesh.
 * @param {Object} data Contains canvasData, color, depth and points properties to construct the geometry.
 * @returns {Object} Mesh.
 */
export default function createExtrude(id, data) {
  const shapeGeometry = createFrontShapeGeometry(data);
  const geometry = createCustomGeometry(data, shapeGeometry);
  computeFaceVertexUVs(geometry, shapeGeometry);
  const texture = createCanvasTexture(data);
  const mesh = createExtrudeMesh(id, geometry, texture);
  return mesh;
}

/**
 * Create a texture containing a canvas.
 *
 * @param {Object} data Data.
 * @returns {Object} Texture containing canvas.
 */
export function createCanvasTexture(data) {
  const { width, height, offsetX, offsetY, scale } = data;

  const canvasEl = document.createElement('canvas');
  canvasEl.width = width;
  canvasEl.height = height;

  const ctx = canvasEl.getContext('2d');
  ctx.fillStyle = '#ffffcc';
  ctx.fillRect(0, 0, width, height);

  const texture = new Texture(canvasEl);
  texture.offset = new Vector2(offsetX / width, offsetY / height);
  texture.repeat = new Vector2(scale / width, scale / width);
  texture.needsUpdate = true;

  return texture;
}

/**
 * Create a ShapeGeometry on basis of configuration data.
 * 
 * @param {Object} data Geometry data of type CanvasExtrudeGeometry.
 */
export function createExtrudeGeometry(data) {
  const shapeGeometry = createFrontShapeGeometry(data);
  const geometry = createCustomGeometry(data, shapeGeometry);
  computeFaceVertexUVs(geometry, shapeGeometry);
  return geometry;
}

/**
 * Create a mesh with geometry and texture,
 *
 * @param {String} name Set as mesh's name.
 * @param {Object} geometry Geometry.
 * @param {Object} texture Texture.
 * @returns {Object} Mesh.
 */
export function createExtrudeMesh(name, geometry, texture) {
  const material = new MeshPhongMaterial({ map: texture, wireframe: false, });

  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = name;

  return mesh;
}

/**
 * Create a ShapeGeometry from coordinate points.
 *
 * @param {Object} data Contains coordinates describing a 2D shape.
 * @returns {Object} shapeGeometry.
 */
function createFrontShapeGeometry(data) {
  const { points, } = data;
  let shape = new Shape();
  points.forEach((point, i) => {
    if (i === 0) {
      shape.moveTo(point[0], point[1]);
    } else {
      shape.lineTo(point[0], point[1]);
    }
  });
  shape.lineTo(points[0][0], points[0][1]);
  const shapeGeometry = new ShapeGeometry(shape);

  return shapeGeometry;
}

/**
 * Create extruded geometry from a 2D shapeGeometry,
 *
 * @param {Object} data
 * @param {Object} shapeGeometry
 * @returns {Object} Geometry
 */
function createCustomGeometry(data, shapeGeometry) {
  const { depth, points } = data;

  // front
  const frontVertices = [ ...shapeGeometry.vertices ];
  const frontFaces = [ ...shapeGeometry.faces];
  const geometry = new Geometry();
  geometry.vertices = frontVertices;
  geometry.faces = frontFaces;

  // back
  const offset = frontVertices.length;
  frontVertices.forEach(v => {
    geometry.vertices.push(new Vector3(v.x, v.y, v.z - depth));
  });
  frontFaces.forEach(f => {
    // flip face normals so the other side is visible
    const face = new Face3(f.c + offset, f.b + offset, f.a + offset);
    geometry.faces.push(face);
  });

  // sides
  const n = points.length;
  for (let i = 0; i < n; i++) {
    // order is bottom, right, top, left
    const j = (i + 1) % n;
    geometry.faces.push(new Face3(i, j, i + offset));
    geometry.faces.push(new Face3(j, j + offset, i + offset));
  }

  geometry.computeFaceNormals();

  return geometry;
}

/**
 * Create faceVertexUvs for a geometry.
 *
 * @param {Object} geometry
 * @param {Object} shapeGeometry
 */
function computeFaceVertexUVs(geometry, shapeGeometry) {
  const { faces, faceVertexUvs, vertices } = geometry;
  const frontVerticesLength = shapeGeometry.vertices.length;
  const frontFacesLength = shapeGeometry.faces.length;

  let i, n;

  faceVertexUvs[0] = [];

  // front faces
  for (i = 0, n = frontFacesLength; i < n; i++) {
    const face = faces[i];
    const { a, b, c } = face;
    const v1 = vertices[a];
    const v2 = vertices[b];
    const v3 = vertices[c];

    faceVertexUvs[0].push([
      new Vector2(v1.x, v1.y),
      new Vector2(v2.x, v2.y),
      new Vector2(v3.x, v3.y),
    ]);
  }

  // back
  for (i = frontFacesLength, n = frontFacesLength * 2; i < n; i++) {
    const face = faces[i];
    const { a, b, c } = face;
    const v1 = vertices[a];
    const v2 = vertices[b];
    const v3 = vertices[c];

    faceVertexUvs[0].push([
      new Vector2(-v1.x + 2 - v1.z, v1.y),
      new Vector2(-v2.x + 2 - v2.z, v2.y),
      new Vector2(-v3.x + 2 - v3.z, v3.y),
    ]);
  }

  // sides
  const facesPerSide = 2;
  let count = 0;
  for (i = frontFacesLength * 2, n = faces.length; i < n; i++) {
    const face = faces[i];
    const { a, b, c } = face;
    const v1 = vertices[a];
    const v2 = vertices[b];
    const v3 = vertices[c];

    const sideIndex = Math.floor(count / facesPerSide);
    if (sideIndex === 1) { // top
      faceVertexUvs[0].push([
        new Vector2(v1.x, v1.y - v1.z),
        new Vector2(v2.x, v2.y - v2.z),
        new Vector2(v3.x, v3.y - v3.z),
      ]);
    } else if (sideIndex === 2) { // right
      faceVertexUvs[0].push([
        new Vector2(v1.x - v1.z, v1.y),
        new Vector2(v2.x - v2.z, v2.y),
        new Vector2(v3.x - v3.z, v3.y),
      ]);
    } else if (sideIndex === 3) { // bottom
      faceVertexUvs[0].push([
        new Vector2(v1.x, v1.y + v1.z),
        new Vector2(v2.x, v2.y + v2.z),
        new Vector2(v3.x, v3.y + v3.z),
      ]);
    } else if (sideIndex === 0) { // left
      faceVertexUvs[0].push([
        new Vector2(-v1.x + v1.z, v1.y),
        new Vector2(-v2.x + v2.z, v2.y),
        new Vector2(-v3.x + v3.z, v3.y),
      ]);
    }

    count++;
  }

  geometry.uvsNeedUpdate = true;
}
