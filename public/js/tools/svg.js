
const dropEl = document.getElementById('drop_zone');
const resultEl = document.getElementById('result');
const heightEl = document.getElementById('height');

dropEl.addEventListener('drop', e => {
  e.preventDefault();
  if (e.dataTransfer.items) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === 'file') {
        const file = e.dataTransfer.items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = e => {
          const fileContent = e.target.result;
          console.log('fileContent', e.target.result);
          const parsed = Snap.parse(e.target.result);
          const absPath = Snap.path.toAbsolute(fileContent);
          console.table(absPath);
          const start = { x: 0, y: 0 };
          let points = absPath.reduce((acc, item, index) => {
            const [ command, val1, val2, ] = item;
            if (isNaN(val1) && command !== 'Z') {
              return acc;
            }
            switch (command) {
              case 'M':
                if (start.x === 0 && start.y === 0) {
                  start.x = val1;
                  start.y = val2;
                  return [ ...acc, [val1, val2] ];
                }
                return [ ...acc ];
              case 'L':
                return [ ...acc, [ val1, val2]];
              case 'H':
                const prevY = acc[acc.length - 1][1];
                return [ ...acc, [ val1, prevY]];
              case 'V':
                const prevX = acc[acc.length - 1][0];
                return [ ...acc, [prevX, val1]];
              // case 'Z':
              //   return [ ...acc, [ ...acc[0] ] ];
              default:
                return acc;
            }
          }, []);
          points = invertVertical(points);
          let boundingBox = getBoundingBox(points);
          points = scale(points, heightEl.value / boundingBox.height);
          document.getElementById('scale_info').innerHTML = `scaled to ${boundingBox.height / heightEl.value} pixels on 1 3D unit`;
          boundingBox = getBoundingBox(points);
          console.log('boundingBox', boundingBox);
          points = translateY(points, boundingBox.bottom);
          points = round(points)
          console.table(points);
          resultEl.innerHTML = JSON.stringify(points);
        };
        reader.readAsText(file);
      }
    }
  } else {
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
    }
  }
});

dropEl.addEventListener('dragover', e => {
  e.preventDefault();
});

function getBoundingBox(points) {
  const rect = { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, };
  points.forEach(point => {
    rect.left = Math.min(rect.left, point[0]);
    rect.right = Math.max(rect.right, point[0]);
    rect.bottom = Math.min(rect.bottom, point[1]);
    rect.top = Math.max(rect.top, point[1]);
  });
  rect.width = rect.right - rect.left;
  rect.height = rect.top - rect.bottom;
  return rect;
}

function invertVertical(points) {
  return points.map(point => [point[0], point[1] * -1]);
}

function scale(points, scale) {
  return points.map(point => [point[0] * scale, point[1] * scale]);
}

function flipVertical(points, boundingBox) {
  return points.map(point => [point[0], boundingBox.height - point[1] + boundingBox.top]);
}

function translateY(points, distance) {
  return points.map(point => [point[0], point[1] - distance]);
}

function round(points, precision = 100000) {
  return points.map(point => [Math.round(point[0] * precision) / precision, Math.round(point[1] * precision) / precision]);
}
