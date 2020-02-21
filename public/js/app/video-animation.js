/**
 * A image sequence video on a canvas texture.
 * 
 * The video plays from a start- to and endframe,
 * initially starting from an optional offset of a number of frames.
 * 
 * The video's position can animate across the canvas along a series of keyframes.
 * 
 * @param {Object} textureCanvas Texture's canvas element.
 * @param {Object} data Scene canvas and video data from JSON.
 * @param {Object} resources Resources data from JSON.
 * @param {Object} texture Mesh's texture.
 * @param {Number} fps FPS of the app player.
 */
export function create(textureCanvas, data, resources, texture, fps) {
  const {
    canvasData,
    flipHorizontal = false,
    videoData,
  } = data;

  const { 
    offsetX: canvasOffsetX = 0, 
    offsetY: canvasOffsetY = 0,
    height: canvasHeight,
    width: canvasWidth,
  } = canvasData;
  
  let {
    end,
    isLoop = false,
    keys = [],
    scale: videoScale = 1,
    start = 0,
    startInitial = videoData.start,
    resourceId,
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
    dx,
    dy,
    dWidth,
    dHeight,
    isAnimating = false,
    isDeferredStart = false,
    isWaitingToStart = false,
    keyCurrentFrame = 0,
    keyEndFrame = 0,
    keyIndex = 0,
    keyStartFrame = 0,
    resourceFPS = 0,
    resourceHeight = 0,
    resourceWidth = 0,
    videoOffsetEndX,
    videoOffsetStartX,
    videoOffsetEndY,
    videoOffsetStartY,

    /**
     * Draw the video clip frame (an Image element) on the texture's canvas.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
     */
    draw = () => {
      if (!isWaitingToStart && img) {
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
      }
      
      if (isAnimating) {
        updateOffset();
      }

      loadImage();
    },

    /**
     * Initialise the video animation.
     */
    init = () => {
      textureCtx = textureCanvas.getContext('2d');
      img = new Image();

      // video resource data
      const resourceData = resources.find(resource => resource.id === resourceId);
      const {
        frames: resourceFrames = 0, 
        url: resourceURL = '#', 
      } = resourceData;

      ({
        fps: resourceFPS,
        height: resourceHeight,
        width: resourceWidth,
      } = resourceData);

      imgURLPrefix = resourceURL.split('#')[0];
      imgURLSuffix = resourceURL.split('#')[1];
      imgURLNr = Math.floor(startInitial * resourceFPS) + 1;
      imgURLNrFirst = Math.floor(start * resourceFPS) + 1;
      imgURLNrLast = end ? Math.min(resourceFrames, Math.floor(end * resourceFPS)) : resourceFrames;
      imgURLNrIncrease = resourceFPS / fps;
      
      updateKeys();
      loadImage();
    },

    /**
     * Load a video frame image based on imgURLNr.
     */
    loadImage = () => {
      if (imgURLNr <= imgURLNrLast && !isWaitingToStart) {
        img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + Math.round(imgURLNr)).slice(-5) : '99999') + imgURLSuffix;
        if (imgURLNr < imgURLNrLast) {
          imgURLNr += imgURLNrIncrease;
        } else {
          imgURLNr = imgURLNrFirst;
        }
      }
    },

    /** 
     * The video position on the canvas is animated.
     * The position 
     */
    updateKeys = () => {
      isAnimating = keys.length > 1 && keyIndex < keys.length - 1;
      isDeferredStart = keys[0].time > 0;
      isWaitingToStart = isDeferredStart && keyIndex === 0;

      if (keyIndex === 0 && isDeferredStart) {
        keys = [ { ...keys[0], time: 0, }, ...keys, ];
      }

      const isLastKey = keyIndex + 1 === keys.length;
      const nextKeyIndex = isLastKey ? keyIndex : keyIndex + 1;

      keyStartFrame = keys[keyIndex].time * resourceFPS;
      keyEndFrame = keys[nextKeyIndex].time * resourceFPS;
      keyCurrentFrame = keyStartFrame;

      videoOffsetStartX = keys[keyIndex].value[0];
      videoOffsetStartY = keys[keyIndex].value[1];
      videoOffsetEndX = keys[nextKeyIndex].value[0];
      videoOffsetEndY = keys[nextKeyIndex].value[1];

      keyIndex = nextKeyIndex;

      dx = canvasOffsetX - (videoOffsetStartX * videoScale);
      dy = canvasHeight - canvasOffsetY - (videoOffsetStartY * videoScale);
      dWidth = resourceWidth * videoScale;
      dHeight = resourceHeight * videoScale;
    },

    /**
     * 
     */
    updateOffset = () => {
      let keyPositionNormalized = (keyCurrentFrame - keyStartFrame) / (keyEndFrame - keyStartFrame);

      if (isAnimating && keyPositionNormalized >= 1) {
        updateKeys();

        // keyPositionNormalized must be recalculated
        if (isAnimating) {
          keyPositionNormalized = (keyCurrentFrame - keyStartFrame) / (keyEndFrame - keyStartFrame);
        }
      }

      keyCurrentFrame += imgURLNrIncrease;

      const videoOffsetCurrentX = videoOffsetStartX + ((videoOffsetEndX - videoOffsetStartX) * keyPositionNormalized);
      const videoOffsetCurrentY = videoOffsetStartY + ((videoOffsetEndY - videoOffsetStartY) * keyPositionNormalized);
      dx = canvasOffsetX - (videoOffsetCurrentX * videoScale);
      dy = canvasHeight - canvasOffsetY - (videoOffsetCurrentY * videoScale);
    };
    
  init();
  
  return {
    draw,
  };
}
