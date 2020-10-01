
export default function convertPreviewToHiRes(data) {
  convertBackground(data);
  data.score.forEach(scene => {
    convertVideoAssets(scene, data);
  });
  return data;
}

function convertBackground(data) {
  if (data.settings.backgroundVideoResourceId) {

      // set the hi-res resource id
      const id = data.settings.backgroundVideoResourceId;
      const highResResourceId = id.substring(0, id.indexOf('_preview'));

      // test if the resource exists
      if (data.resources.find(resource => resource.id === highResResourceId)) {
        data.settings.backgroundVideoResourceId = highResResourceId;
      }
  }
}

/**
 * All 
 * @param {*} scene 
 * @param {*} data 
 */
function convertVideoAssets(scene, data) {

  // all assets
  Object.keys(scene.assets).forEach(assetId => {
    const asset = scene.assets[assetId];
    if (asset.resourceId && asset.resourceId.indexOf('_preview') !== -1) {

      // preview resource
      const previewResource = data.resources.find(resource => resource.id === asset.resourceId);

      // set the hi-res resource id
      asset.resourceId = asset.resourceId.substring(0, asset.resourceId.indexOf('_preview'));

      // the hi-res resource data
      const highResResource = data.resources.find(resource => resource.id === asset.resourceId);

      // the canvas data
      const canvasId = Object.keys(scene.canvases).find(canvasId => scene.canvases[canvasId].videoId === assetId);
      const canvas = scene.canvases[canvasId];

      // set the hi-res video scale
      asset.scale = canvas.height / (highResResource.height * ((canvas.height / asset.scale) / previewResource.height));

      // all video animation keys
      asset.keys.forEach(key => {
        key.value[0] = highResResource.width * (key.value[0] / previewResource.width);
        key.value[1] = highResResource.height * (key.value[1] / previewResource.height);
      });
    }
  });
}


// WOMAN HI-RES
// previewHeight = 76;
// previewWidth = 480;
// hiResHeight = 1920;
// hiResWidth = 1920;
// actorStart = 2;
// createActor(scene, fps, {
//   gw: 2.0, gh: 2.3,
//   keys: [
//     { t:  0 + actorStart, v: [ -10.7, -0.5, -10]},
//     { t: 17 + actorStart, v: [  11.0, -0.5, -10]},
//   ],
//   cSz: 512, cSc: 512/2.5, cOf: 0,
//   vSc: 512/(hiResHeight*(76/previewHeight)),
//   vt: [0, 15],
//   vKeys: [
//     { t:  0 + actorStart, v: [ hiResWidth*(-80/previewWidth), hiResHeight*(73/previewHeight)]},
//     { t: 15 + actorStart, v: [ hiResWidth*(480/previewWidth), hiResHeight*(73/previewHeight)]},
//   ],
//   vrid: 'mkp_woman',
// });