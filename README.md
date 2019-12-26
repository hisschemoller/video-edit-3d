# video-edit-3d

Video and animation in WebGL using three.js

## settings JSON

All of the 3D animation is read from one data structure containing four parts:

```javascript
{
  settings: {}, // canvas size, framerate and musical timing
  camera: {}, // the 3D scene's camera
  resources: [], // video image sequences information
  score: [ // 3D object hierarchies, their video textures and animations
    sceneA: {}, // the score contains a series of scenes
    sceneB: {},
    // etcetera...
  ]
}
```

A scene:

```javascript
{
  animations: [], // animation structure as spefified in three.js
  canvases: {},
  geometries: [],
  clipId: '',
  lifespan: [0, 1],
  materials: [],
  metadata: {},
  object: {},
  videos: {}
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

## FFMPEG

Convert AVI to MP4:

```bash
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

Extract a time slice of an original video.
-ss is the start time,
-t is the slice duration.
Timestamps are in HH:MM:SS.xxx format or in seconds (s.msec).

```
ffmpeg -ss 00:00:30.0 -i input.avi -c copy -t 00:00:10.0 output.avi
ffmpeg -ss 30 -i input.avi -c copy -t 10 output.avi
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

## Data structure

