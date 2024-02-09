# video-edit-3d

Video and animation in WebGL using three.js

An app to create a 3D world and project video sequences on the surface of 3D objects. The 3D objects can animate.

## Table of contents

- [Using the app](#manual)
- [Structure of the main app data](#structure)
- [Scene data](#scene)
- [Animation data](#animation)
- [Units](#units)
- [Matrix4](#matrix4)
- [Preview](#preview)
- [External 3D model file import](#import)
- [Animated video position acceleration](#videoanimation)
- [SVG path to extrude shape](#extrude)
- [FFMPEG](#ffmpg)

- [README_place-saint-michel.md](README_place-saint-michel.md)

## Using the app <a name="manual"></a>

* `yarn start` to start Node and the server, then run the app on `http://localhost:3012/`.
* For Place Saint-Michel all source videos PNG frames, even the preview ones, are on the Samsung external disk.
* Function `setup()` in `main.js` has several options:
  * `isCapture` - Set to `true` to render highest resolution PNG frames.
  * `scenesToPlay` - If used, only play the scenes in this array. To simplify the score.


## Structure of the main app data <a name="structure"></a>

All of the 3D world, its animations, texture images and videos and all variable settings are read from one big data object.

The data object is based on the JSON Object Scene format 4: https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4

The base data structure contains these parts:

```javascript
{
  settings: {}, // main canvas size, framerate and musical timing, background image etc.
  camera: {}, // the 3D scene's camera settings
  gltfFiles: [], // Names of GLTF files to preload. Contain meshes modelled in Blender, in my case.
  resources: [], // video image sequences information
  score: [ // 3D object hierarchies, their video textures and animations
    sceneA: {}, // the score contains a series of scenes
    sceneB: {},
    // etcetera...
  ]
}
```

### Scene data <a name="scene"></a>

The properties `animations`, `geometries`, `metadata`, `materials` and `objects` are in the JSON Object Scene 4.3 format.

JSON Object Scene format 4: https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4

```javascript
{
  animations: [], // animation structure as spefified in three.js
  assets: {}, // Image and video references to be used as 3D canvas textures.
  canvases: {}, // Canvas data to be used as textures, to paint images and video on.
  clipId: '', // Unique ID for the scene.
  external3DModels: [], // Externally modelled objects to be copied from GLTF files to the scene.
  geometries: [], // 3D geometries.
  images: [], // Images to be used as texture.
  lifespan: [0, 1], // scene start and end time in seconds
  materials: [], // 3D materials.
  metadata: {}, // Scene 4.3 format metadata.
  object: {}, // 3D object hierarchy, usually with Group as root
  textures: {} // 3D textures.
}
```

A `geometry` can have custom type `CanvasExtrudeGeometry` which is a extruded SVG path shape with video canvas texture.

Object hierarchy:

```javascript
{
  "objects": [
    {
      "type": "canvas-extrude", // an extruded geometric shape
      "name": "", // name used for the 3D object
      "color": "#f7f777", // 3D object texture color
      "depth": 1, // extrude depth
      "x": 0, "y": 0, "z": 0, // object position in the 3D scene
      "points": [ // coordinates of the extruded shape
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1]
      ],
      "canvas": {
        "offsetX": 256, 
        "offsetY": 256,
        "scale": 128, // how many pixels to cover one 3D unit
        "width": 512, // canvas width
        "height": 512 // canvas height
      },
    }
  ]
}
```

## Animation data <a name="animation"></a>

Three.js documentation Animation system: https://threejs.org/docs/index.html#manual/en/introduction/Animation-system

```javascript
{ // all data
  score: [
    { // a scene in the score
      animations: [
        { // an AnimationClip
          blendMode: NormalAnimationBlendMode=2500|AdditiveAnimationBlendMode=2501, // ???
          duration: 60, // measured in frames
          loop: LoopOnce=2200|LoopRepeat=2201|LoopPingPong=2202,
          name: 'animation-clip-name',
          tracks: [
            { // a KeyframeTrack

            },
          ],
          uuid: 'any-unique-id',
        }
      ],
    },
  ],
},
```


## Units <a name="units"></a>

Geometry path is measured in 3D units.

```javascript
canvas: {
  width: 512, // width in pixels
  height: 512, // height in pixels
  scale: 60, // 60 pixels cover one 3D unit 
  offsetX: 0, // 
  offsetY: 0 // 
}
```

## Matrix4 <a name="matrix4"></a>

Default
```javascript
[ 1,0,0,0 ,0,1,0,0 ,0,0,1,0 ,0,0,0,1 ]
```
Scale
```javascript
[ x,0,0,0 ,0,y,0,0 ,0,0,z,0 ,0,0,0,1 ]
```
Translate
```javascript
[ 1,0,0,0 ,0,1,0,0 ,0,0,1,0 ,x,y,z,1 ]
```

## Preview <a name="preview"></a>

If video image sequences are too heavy to load in time for the app to run smooth, a preview option exists.

1. For each image sequence folder create another folder with the same sequence scaled down. I used 25%.
2. Name that folder the same, but with a '_preview' suffix.

```bash
  /public/frames/my-image-sequence
  /public/frames/my-image-sequence_preview
```

3. Only reference the preview folders in the data, so that while working only the fast small images are used.
4. When it's time to render, convert the data to use the full files. 
5. This is done within main.js just before the app initialises.

```javascript
import convertPreviewToHiRes from './hi-res.js';
import appData from '../data/app-data.js';

const hiResData = convertPreviewToHiRes(appData);

setup({
  data: hiResData,
  isCapture: true,
});
```

## External 3D model file import <a name="import"></a>

Three.js documentation recommends glTF (GL Transmission Format) files. Blender exports this type.

https://threejs.org/docs/#manual/en/introduction/Loading-3D-models

How to add external models to the 3D world in the app:

1. Add the file to the `public/3d/` folder.
2. Add the file's name to the data object.

```javascript
const data = {
  // ...
  gltfFiles: [ 'blender-export-gltf-file.glb' ],
};
```

The file will now be preloaded before the 3D world initialises.

To add a model from the file to a scene, add it to the scene's data:

```javascript
const data = {
  score: [
    {
      external3DModels: [
        {
          id: 'any-unique-id',
          imageFile: 'image-to-use-as-texture.png',
          keys: [
            { time:  0, value: [0, 0, 0]}, // at least one key for the position
            { time: 60, value: [1, 0, 0]}, // more keys for animation
          ],
          modelFile: 'blender-export-gltf-file.glb',
          modelName: 'model-in-the-blender-file',
        },
      ],
    }
  ],
};
```

When a scene loads, the model is taken from the preloaded file and added to the scene. This happens in the `loadScene()` function in `world.js` by calling `addGLTFModelsToData()` in `gltf.js`. This only adds to the data object. Later, `ObjectLoader`'s `parse()` creates a 3D scene from the data.

<b>Note:</b> An image texture exported from blender shows too dark in three.js. I read this has something to do with a conversion between sRGB and linear colours, but I didn't really understand. To fix it the texture is created in three.js.


## Animated video position acceleration <a name="videoanimation"></a>

When a video - an image sequence actually - is used as the texture of a mesh, the position of the video can be animated. This is used to keep a walking person positioned at the center of a 3D cube, while the person walks from left to right through the video.

The position of the video on the canvas texture is changed over time. Sometimes a simple linear animation velocity won't do, so an acceleration option exists.

```javascript
  scene: {
    assets: {
      videoUUID: {
        keys: [
          { time:  0, value: [0, 0, 0], acceleration: 0.2}, // at least one key for the position
          { time: 60, value: [1, 0, 0]}, // more keys for animation
        ],
      }
    }
  }
```

At acceleration: 0 the animation is linear. When acceleration is a positive number the animation starts fast and ends slow. When it's 0.2 for example, it will start at 1.2 times the speed and ends at 0.8 times the speed. The objective is to always keep the total animated distance the same amount of time. So the animation starts as much faster as it ends slower, and the break even point of original speed is halfway.

The code that generates the acceleration is in `video-animation.js`.

## SVG path to extrude shape <a name="extrude"></a>

- In Adobe XD create a line drawing with the pen tool, using only straight line segments.
  - Choose File > Export... > All Artboards...
  - Select SVG as Format.
  - Save the SVG file.
- Open tools.html
  - Enter the desired height of the shape in 3D units.
  - Drag and drop the SVG file on the indicated area. 
  - Copy the resulting coordinates string.
- Paste the coordinates array in the CanvasExtrudeGeometry points property.

Online SVG editors

- Method Draw: https://editor.method.ac/
- Draw SVG: https://www.drawsvg.org/drawsvg.htmlhttps://www.drawsvg.org/drawsvg.html

### Align SVG shape with image


## FFMPEG <a name="ffmpg"></a>

Convert AVI to MP4.
The first works best in Quicktime on Mac.

```bash
ffmpeg -i input.avi -f mp4 -vcodec libx264 -pix_fmt yuv420p output.mp4
ffmpeg -i input.avi -c:v libx264 -crf 19 -preset slow -c:a aac -b:a 192k -ac 2 output.mp4
```

Convert AVI to PNG image sequence.
'%05d' generates a zero padded five digit integer.

```
ffmpeg -i input.avi output_%05d.png
```

Convert PNG image sequence to MP4.

```
ffmpeg -framerate 30 -i tmp/frame_%05d.png -c:v libx264 -crf 19 -preset slow -c:a aac -b:a 192k -ac 2 output.mp4
```

Convert PNG image sequence to MP4. This one works in Quicktime.

```
ffmpeg -framerate 30 -i tmp/frame_%05d.png -f mp4 -vcodec libx264 -pix_fmt yuv420p output.mp4
```

Create video from image sequence with a pause between each image. -r 1.0 is one second per image, -t 31 is total video duration in seconds.

```
ffmpeg -loop 1 -f image2 -r 1.0 -i spui_%03d.jpg -c:v libx264 -pix_fmt yuv420p -tune stillimage -r 5 -t 41 -y output.mp4
```

Convert MOV to MP4, lossless.

```
ffmpeg -i input.mov -vcodec copy -acodec copy output.mp4
```

Convert MP4 to MOV.

```
ffmpeg -i input.mp4 -acodec copy -vcodec copy -f mov output.mov
```

Crop video with the crop filter.
out_w and out_h are width and height of the output rectangle.
out_x and out_y are the left top corner of the output rectangle.

```
ffmpeg -i input.avi -filter:v "crop=out_w:out_h:out_x:out_y" output.avi
```

Scale video to a specific size. -1 to keep aspect ratio.

```
ffmpeg -i input.avi -vf scale=320:240 output.avi
ffmpeg -i input.jpg -vf scale=320:-1 output_320.png
```

Rotate video<br>
Works with MP4 files, didn't with MOV.<br>
Example rotates 1.3 degrees clockwise.

```
ffmpeg -i input.mp4 -vf "rotate=1.3*PI/180" output.mp4
```

Rotate video, highest quality.<br>
(Doesn't play in Quicktime but does in VLC)<br>
H.264 Video Encoding Guide: https://trac.ffmpeg.org/wiki/Encode/H.264

```
ffmpeg -i input.mp4 -vf "rotate=0.8*PI/180" -vcodec libx264 -crf 0 -preset medium output.mp4
```

Extract a time slice of an original video.
-ss is the start time,
-t is the slice duration.
Timestamps are in HH:MM:SS.xxx format or in seconds (s.msec).

```
ffmpeg -ss 00:00:30.0 -i input.avi -c copy -t 00:00:10.0 output.avi
ffmpeg -ss 30 -i input.avi -c copy -t 10 output.avi
```

Concatenate media files with the same codecs

```
ffmpeg -i "concat:input1.avi|input2.avi|input3.avi" -c copy output.avi
```

Extract sound from video to wav.

```
ffmpeg -i input.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 output.wav
```

Add wav audio to mp4 video

```
ffmpeg -i input_vid.mp4 -i input_audio.wav -vcodec copy output.mp4
ffmpeg -i input_vid.mp4 -i input_audio.wav -vcodec libx264 -acodec libmp3lame output.mp4
```

Remove audio from a video file.

```
ffmpeg -i input.mov -vcodec copy -an input.mov
```
