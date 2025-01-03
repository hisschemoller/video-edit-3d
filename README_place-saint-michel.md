# Place Saint-Michel

## Video's gebruikt voor de wanden.

* 1578 
  * West
  * Rotatie: Tamelijk recht.
* 1579 
  * Noord
  * Rotatie: -1,2 (CCW)
* 1580
  * Zuid
  * Rotatie: Recht genoeg.
* 1581
  * Zuid
  * Rotatie: -0,8
* 1582
  * West
  * Rotatie: Recht genoeg.
* 1583
  * Oost
  * Rotatie: Recht genoeg.
* 1584
  * Oost
  * Rotatie: Recht genoeg.
* 1585
  * Noord
  * Rotatie: Recht genoeg.
* 1600
  * West
  * Rotatie: -0.36
* 1602
  * West
  * Rotatie: 3,76
* 1603
  * Noord
  * Rotatie: -2,9
* 1628
  * West
  * Rotatie: -0,5

## Bewegende mensen en voertuigen.

* N 1579 QUAI DU MARCHÉ NEUF
  * Vooral auto's van en naar Ile de la Cité.
* Z 1581 FONTEIN
  * Veel lopende mensen, ook stilstaande.
* W 1582 RUE DE LA HUCHETTE
  * Tussen de auto's door mensen op de stoep en wat fietsen.
* O 1583 HOEK OOST MET SEINE
  * Veel auto's, bussen, fietsen en mensen lopend.
* O 1584 OOST POORT
  * Wat mensen op de stoep aan de overkant, bestelwagen Stricher.
* N 1585 QUAI DES ORFEVRES - PALAIS DE JUSTICE
  * 00:31-00:40 - Man met zwarte hoed van links naar rechts.
  * 00:36-00:41 - Fietser met geel hesje, L>R.
  * 00:43-00:49 - Man met rol papier, R>L.
  * 01:10-01:21 - Man uit taxi, R>L.
  * 01:21-01:44 - Vrouw met lang haar, L>R.
  * 01:29-01:50 - Jongen met scooter, L>R.
* W 1600 GILBERT JEUNE
  * Kenmerkende stilstaande groepjes en mensen.
* W 1628 QUAI SAINT MICHEL
  * Vooral veel druk verkeer.

## Camera path

* lineTo 43.75 (towards the fountain)
* curveTo 53.420370902023365 (corner part 1)
* curveTo 63.09074180404672 (corner part 2)
* lineTo 69.34074180404671 (passed gilbert jeune)
* curveTo 88.68148360809344 (wide corner)
* lineTo 119.93148360809344 (towards the green door)
* curveTo 129.60185451011677 (corner part 1)
* curveTo 139.2722254121401 (corner part 2)
* curveTo 153.48865960886963 (right left slalom towards Rue de la Huchette)
* lineTo 178.48865960886963 (straight towards Rue de la Huchette)
* curveTo 188.15903051089296 (turn towards Notre Dame)
* curveTo 197.8294014129163 (turn towards east)
* lineTo 210.3294014129163 (turn towards startpoint ??? nee, klopt niet meer)
* curveTo 229.67014321696297 ()
* lineTo 248.42014321696297 ()
* curveTo 258.0905141189863 ()
* curveTo 267.76088502100964 ()
* lineTo 292.76088502100964 ()
* curveTo 312.10162682505626 ()
* lineTo 318.35162682505626 ()

Total camera travel time: 318.35 sec.

## Scenes

* 0, 320, plstmichel-main.js (ground, camera)
* ...wallScenes
* 0, 55, plstmichel-actors1.js
* 43, 95, plstmichel-actors2.js, vanaf fontein bocht naar Notre Dame en verder naar oosten.
* 89, 120, plstmichel-actors3.js, westelijk naar muur 1583, hoek met de Seine.
* 115, 140, plstmichel-actors4.js, west, turn around to east, Rue de la Huchette.
* 132, 183, plstmichel-actors5.js, east towards Rue de la Huchette.
* 168, 215.16, plstmichel-actors6.js, passing Notre Dame.
* 197, 215.16, plstmichel-actors7.js, towards end and start.

## Frames, preview video en frames.

```bash
ffmpeg -i videos_placesaintmichel/IMG_1585.mov frames_placesaintmichel/1585/frame_%05d.png
ffmpeg -i videos_placesaintmichel/IMG_1585.MOV -vf scale=480:-1 videos_placesaintmichel/IMG_1585_preview.mov
ffmpeg -i videos_placesaintmichel/IMG_1585_preview.mov frames_placesaintmichel/1585_preview/frame_%05d.png
```

http://localhost:3012/fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1585_preview/&img=frame_00003.png

```bash
ffmpeg -i videos_placesaintmichel/IMG_1581.mov -vf "rotate=-0.8*PI/180" -vcodec libx264 -crf 0 -preset medium videos_placesaintmichel/IMG_1581r.mp4
ffmpeg -i videos_placesaintmichel/IMG_1581r.mp4 frames_placesaintmichel/1581/frame_%05d.png
ffmpeg -i videos_placesaintmichel/IMG_1581r.mp4 -vf scale=480:-1 videos_placesaintmichel/IMG_1581r_preview.mp4
ffmpeg -i videos_placesaintmichel/IMG_1581r_preview.mp4 frames_placesaintmichel/1581_preview/frame_%05d.png

ffmpeg -i videos_placesaintmichel/IMG_1578.MOV frames_placesaintmichel/1578/frame_%05d.png
ffmpeg -i videos_placesaintmichel/IMG_1578.MOV -vf scale=480:-1 videos_placesaintmichel/IMG_1578_preview.mp4
ffmpeg -i videos_placesaintmichel/IMG_1578_preview.mp4 frames_placesaintmichel/1578_preview/frame_%05d.png
```

## WebGL memory test.

https://threejs.org/examples/webgl_test_memory.html
https://threejs.org/examples/webgl_test_memory2.html
https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.info
https://www.khronos.org/registry/webgl/conformance-suites/1.0.0/extra/out-of-memory.html


## Also remove after scene end

* AnimationMixer from mixers.
* Video canvas animations from canvas.js and video-animation.js


## Render

```bash
# png seq to mp4
ffmpeg -framerate 30 -i rendered/frame_%05d.png -f mp4 -vcodec libx264 -pix_fmt yuv420p wouter-hisschemoller_-_place-st-michel-test-render-2024-12-24.mp4
```
