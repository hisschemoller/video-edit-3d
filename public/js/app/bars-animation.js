
export function create(textureCanvas, data) {
  const { width, height } = data.canvas;
  const { bars, speed, isVertical, hskew, vskew } = data.animation;
  const x = 0;
  const y = 0;

  let textureCtx,
    canvas,
    ctx,
    itemSize,

    init = function() {
      textureCtx = textureCanvas.getContext('2d');
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      itemSize = bars.reduce((acc, bar) => acc + bar.size, 0);
      
      if (isVertical) {
        const repeats = Math.ceil(height / itemSize) + 2;
        const canvasSize = repeats * itemSize;
        canvas.height = canvasSize;
        canvas.width = width;
        for (let i = 0; i < repeats; i++) {
          let barSize = 0;
          for (let j = 0; j < bars.length; j++) {
            const { size } = bars[j];
            const y = (i * itemSize) + barSize;
            barSize += size;
            ctx.fillStyle = bars[j].color;
            ctx.fillRect(0, y, width, size);
          }
        }
      } else {
        const repeats = Math.ceil(width / itemSize) + 2;
        const canvasSize = repeats * itemSize;
        canvas.height = height;
        canvas.width = canvasSize;
        for (let i = 0; i < repeats; i++) {
          let barSize = 0;
          for (let j = 0; j < bars.length; j++) {
            const { size } = bars[j];
            const x = (i * itemSize) + barSize;
            barSize += size;
            ctx.fillStyle = bars[j].color;
            ctx.fillRect(x, 0, size, height);
          }
        }
      }
    },
    
    draw = function(frame = 0) {
      let xT = 0;
      let yT = 0;
      if (isVertical) {
        if (speed < 0) {
          yT = (-speed * frame) % itemSize;
        } else if (speed > 0) {
          yT = ((-speed * frame) % itemSize) + itemSize * 2;
        }
      } else {
        if (speed < 0) {
          xT = (-speed * frame) % itemSize;
        } else if (speed > 0) {
          xT = ((-speed * frame) % itemSize) + itemSize * 2;
        }
      }
      
      textureCtx.save();
      textureCtx.transform(1, hskew, vskew, 1, x, y);
      textureCtx.drawImage(canvas, 
        xT, yT, width, height, 
        0, 0, width, height);
      textureCtx.restore();
    };
    
  init();

  return {
    draw,
  };
}