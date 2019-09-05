
export function create(textureCanvas, data, resources, texture, fps) {
  const { canvas, flipHorizontal = false, video, } = data;
  const { resourceId, offsetX = 0, offsetY = 0, scale = 1, start = 0, end, isLoop = false } = video;

  let textureCtx,
    img,
    imgURLNr = 1,
    imgURLNrFirst,
    imgURLNrLast,
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
      const { url, width, height, frames } = resource;
      imgURLPrefix = url.split('#')[0];
      imgURLSuffix = url.split('#')[1];
      imgURLNr = Math.floor(start * fps) + 1;
      imgURLNrFirst = imgURLNr;
      imgURLNrLast = end ? Math.floor(end * fps) : frames;

      dx = canvas.offsetX - (offsetX * scale);
      dy = canvas.offsetY + ((offsetY - height) * scale);
      dWidth = width * scale;
      dHeight = height * scale;

      img = new Image();
      loadImage();
    },

    loadImage = function() {
      if (imgURLNr <= imgURLNrLast) {
        img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + imgURLNr).slice(-5) : '99999') + imgURLSuffix;
        if (imgURLNr < imgURLNrLast) {
          imgURLNr += 1;
        } else {
          imgURLNr = imgURLNrFirst;
        }
      }
    },

    /**
     * Draw the video clip frame on canvas.
     * @param {Object} ctx Canvas drawing context.
     */
    draw = function() {
      if (flipHorizontal) {
        textureCtx.save();
        textureCtx.scale(-1, 1);
        textureCtx.drawImage(img, dx, dy, dWidth, dHeight);
        textureCtx.restore();
      } else {
        textureCtx.drawImage(img, dx, dy, dWidth, dHeight);
      }
      loadImage();
    };
    
  init();

  return {
    draw,
  };
}