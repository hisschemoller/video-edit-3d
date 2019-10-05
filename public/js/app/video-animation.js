
/**
 * 
 * @param {Object} textureCanvas Texture's canvas element.
 * @param {Object} data 
 * @param {Object} resources 
 * @param {Object} texture Mesh's texture.
 * @param {Number} fps FPS of the app player.
 */
export function create(textureCanvas, data, resources, texture, fps) {
  const { canvasData, flipHorizontal = false, videoData, } = data;
  const { resourceId, offsetX = 0, offsetY = 0, scale = 1, start = 0, end, isLoop = false, repeat = null, } = videoData;

  let textureCtx,
    img,
    imgURLNr = 1,
    imgURLNrFirst,
    imgURLNrLast,
    imgURLNrIncrease = 1,
    imgURLPrefix,
    imgURLSuffix,
    resource,
    dx,
    dy,
    dWidth,
    dHeight,

    init = function() {
      textureCtx = textureCanvas.getContext('2d');

      // video resource
      resource = resources.find(resource => resource.id === resourceId);
      const { url, width, height, fps: videoFPS = 30, frames, } = resource;
      imgURLPrefix = url.split('#')[0];
      imgURLSuffix = url.split('#')[1];
      imgURLNr = Math.floor(start * videoFPS) + 1;
      imgURLNrFirst = imgURLNr;
      imgURLNrLast = end ? Math.floor(end * videoFPS) : frames;
      imgURLNrIncrease = videoFPS / fps;

      dx = canvasData.offsetX - (offsetX * scale);
      dy = canvasData.offsetY + ((offsetY - height) * scale);
      dWidth = width * scale;
      dHeight = height * scale;

      img = new Image();
      loadImage();
    },

    /**
     * Load a video frame image based on imgURLNr.
     */
    loadImage = function() {
      // if (imgURLNr <= imgURLNrLast) {
        img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + Math.round(imgURLNr)).slice(-5) : '99999') + imgURLSuffix;
        if (imgURLNr < imgURLNrLast) {
          imgURLNr += imgURLNrIncrease;
        } else {
          imgURLNr = imgURLNrFirst;
        }
      // }
    },

    /**
     * Draw the video clip frame on canvas.
     * @param {Object} ctx Canvas drawing context.
     */
    draw = function() {
      if (repeat) {
        textureCtx.fillStyle = textureCtx.createPattern(img, repeat);
        textureCtx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
      } else {
        if (flipHorizontal) {
          textureCtx.save();
          textureCtx.scale(-1, 1);
          textureCtx.drawImage(img, dx, dy, dWidth, dHeight);
          textureCtx.restore();
        } else {
          textureCtx.drawImage(img, dx, dy, dWidth, dHeight);
        }
      }
      
      loadImage();
    };
    
  init();

  return {
    draw,
  };
}