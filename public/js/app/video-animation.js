
/**
 * 
 * @param {Object} textureCanvas Texture's canvas element.
 * @param {Object} data 
 * @param {Object} resources 
 * @param {Object} texture Mesh's texture.
 * @param {Number} fps FPS of the app player.
 */
export function create(textureCanvas, data, resources, texture, fps) {
  const {
    canvasData,
    flipHorizontal = false,
    videoData, } = data;
  const { 
    offsetX: canvasOffsetX = 0, 
    offsetY: canvasOffsetY = 0,
    height: canvasHeight,
    width: canvasWidth,
  } = canvasData;
  const {  
    offsetX: videoOffsetStartX = 0, 
    offsetY: videoOffsetY = 0,
    offsetX2: videoOffsetEndX = videoData.offsetX,
    scale: videoScale = 1,
    resourceId,
    startInitial = videoData.start,
    start = 0, 
    end, 
    isLoop = false, 
    repeat = null, 
  } = videoData;

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
    isAnimated = videoOffsetStartX !== videoOffsetEndX,

    init = function() {
      textureCtx = textureCanvas.getContext('2d');

      // video resource
      resource = resources.find(resource => resource.id === resourceId);
      const {
        width: resourceWidth, 
        height: resourceHeight, 
        fps: resourceFPS = 30,
        frames, url, 
      } = resource;
      imgURLPrefix = url.split('#')[0];
      imgURLSuffix = url.split('#')[1];
      imgURLNr = Math.floor(startInitial * resourceFPS) + 1;
      imgURLNrFirst = Math.floor(start * resourceFPS) + 1;
      imgURLNrLast = end ? Math.floor(end * resourceFPS) : frames;
      imgURLNrIncrease = resourceFPS / fps;
      
      dx = canvasOffsetX - (videoOffsetStartX * videoScale);
      dy = canvasHeight - canvasOffsetY - (videoOffsetY * videoScale);
      dWidth = resourceWidth * videoScale;
      dHeight = resourceHeight * videoScale;

      img = new Image();
      loadImage();
    },

    updateOffset = function() {
      const positionNormalized = (imgURLNr - imgURLNrFirst) / (imgURLNrLast - imgURLNrFirst);
      const videoOffsetX = videoOffsetStartX + ((videoOffsetEndX - videoOffsetStartX) * positionNormalized);
      dx = canvasOffsetX - (videoOffsetX * videoScale);
    },

    /**
     * Load a video frame image based on imgURLNr.
     */
    loadImage = function() {
      if (imgURLNr <= imgURLNrLast) {
        img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + Math.round(imgURLNr)).slice(-5) : '99999') + imgURLSuffix;
        if (imgURLNr < imgURLNrLast) {
          imgURLNr += imgURLNrIncrease;
        } else {
          imgURLNr = imgURLNrFirst;
        }
      }
    },

    /**
     * Draw the video clip frame (an Image element) on the texture's canvas.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
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
      
      if (isAnimated) {
        updateOffset();
      }
      loadImage();
    };
    
  init();

  return {
    draw,
  };
}