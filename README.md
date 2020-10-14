# video-edit-3d

Video and animation in WebGL using three.js

An app to create a 3D world and project video sequences on the surface of 3D objects. The 3D objects can animate.

## Structure of the app data

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

### Scene JSON data 

The properties `animations`, `geometries`, `metadata`, `materials` and `objects` are in the JSON Object Scene 4.3 format.

JSON Object Scene format 4: https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4

A `geometry` can have custom type `CanvasExtrudeGeometry` which is a extruded SVG path shape with video canvas texture.

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

## Units

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


## Matrix4

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

## SVG path to extrude shape

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


## FFMPEG

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
