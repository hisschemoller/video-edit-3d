
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
          console.log('file', e.target.result);
          const parsed = Snap.parse(e.target.result);
          const absPath = Snap.path.toAbsolute(fileContent);
          console.log('absPath', absPath);
          const start = { x: 0, y: 0 };
          let points = absPath.reduce((acc, item, index) => {
            const [ command, val1, val2, ] = item;
            if (isNaN(val1)) {
              return acc;
            }
            switch (command) {
              case 'M':
                if (start.x === 0 && start.y === 0) {
                  start.x = val1;
                  start.y = val2;
                }
                return acc;
              case 'L':
                return [ ...acc, [ val1 - start.x, val2 - start.y]];
              case 'H':
                const prev = absPath[index - 1];
                const prevVal = prev.length === 3 ? prev[2] : prev[1];
                return [ ...acc, [ val1 - start.x, prevVal - start.y]];
              case 'V':
                return [ ...acc, [ absPath[index - 1][1] - start.x, val1 - start.y]];
              // case 'Z':
              //   console.log(acc[0]);
              //   return [ ...acc, [ ...acc[0] ] ];
              default:
                return acc;
            }
          }, []);
          points = invertVertical(points);
          console.log('points', points);
          let boundingBox = getBoundingBox(points);
          points = scale(points, heightEl.value / boundingBox.height);
          boundingBox = getBoundingBox(points);
          // points = flipVertical(points, boundingBox);
          console.log(boundingBox);
          points = translateY(points, boundingBox.bottom);

          console.log('points', points);
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
  return points.map(point => [point[0], point[1] + distance]);
}


