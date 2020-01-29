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
  
  const {
    // offsetX: videoOffsetStartX = 0, 
    // offsetY: videoOffsetY = 0,
    // offsetX2: videoOffsetEndX = videoData.offsetX,
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
    isAnimated = keys.length > 1,
    keyCurrentFrame = 0,
    keyEndFrame = 0,
    keyIndex = 0,
    keyStartFrame = 0,
    resourceWidth = 0,
    resourceHeight = 0,
    // videoOffsetCurrentX,
    videoOffsetEndX,
    videoOffsetStartX,
    videoOffsetX,
    videoOffsetY,

    /**
     * Draw the video clip frame (an Image element) on the texture's canvas.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
     */
    draw = () => {
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
    },

    /**
     * Initialise the video animation.
     */
    init = function() {
      textureCtx = textureCanvas.getContext('2d');
      img = new Image();

      // video resource data
      const {
        width, 
        height, 
        fps: resourceFPS = 30,
        frames: resourceFrames = 0, 
        url: resourceURL = '#', 
      } = resources.find(resource => resource.id === resourceId);

      resourceWidth = width,
      resourceHeight = height;

      imgURLPrefix = resourceURL.split('#')[0];
      imgURLSuffix = resourceURL.split('#')[1];
      imgURLNr = Math.floor(startInitial * resourceFPS) + 1;
      imgURLNrFirst = Math.floor(start * resourceFPS) + 1;
      imgURLNrLast = end ? Math.floor(end * resourceFPS) : resourceFrames;
      imgURLNrIncrease = resourceFPS / fps;

      updateKeys();
      loadImage();
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
     * The video position on the canvas is animated.
     * The position 
     */
    updateKeys = () => {
      if (keyIndex === keys.length) {
        isAnimated = false;
        return;
      }
      const isLastKey = keyIndex + 1 === keys.length;
      const nextKeyIndex = isLastKey ? keyIndex : keyIndex + 1;

      keyStartFrame = keys[keyIndex].time * fps;
      keyEndFrame = keys[nextKeyIndex].time * fps;
      keyCurrentFrame = keyStartFrame;

      videoOffsetStartX = keys[keyIndex].value[0];
      videoOffsetEndX = keys[nextKeyIndex].value[0];
      // videoOffsetCurrentX = videoOffsetStartX;
      videoOffsetY = keys[keyIndex].value[1];
      console.log('start end ', videoOffsetStartX, videoOffsetEndX);

      keyIndex = nextKeyIndex;
      
      dx = canvasOffsetX - (videoOffsetStartX * videoScale);
      dy = canvasHeight - canvasOffsetY - (videoOffsetY * videoScale);
      dWidth = resourceWidth * videoScale;
      dHeight = resourceHeight * videoScale;
    },

    /**
     * 
     */
    updateOffset = () => {
      const keyPositionNormalized = (keyCurrentFrame - keyStartFrame) / (keyEndFrame - keyStartFrame);
      keyCurrentFrame += imgURLNrIncrease;
      // console.log(keyPositionNormalized);

      if (isAnimated && keyPositionNormalized >= 1) {
        updateKeys();
      }

      const positionNormalized = (imgURLNr - imgURLNrFirst) / (imgURLNrLast - imgURLNrFirst);
      const videoOffsetCurrentX = videoOffsetStartX + ((videoOffsetEndX - videoOffsetStartX) * keyPositionNormalized);
      dx = canvasOffsetX - (videoOffsetCurrentX * videoScale);
      console.log(keyCurrentFrame, keyStartFrame, keyEndFrame);
    };
    
  init();

  
  return {
    draw,
  };
}
