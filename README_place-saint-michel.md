# Place Saint Michel

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

## Frames, preview video en frames.

ffmpeg -i videos_placesaintmichel/IMG_1585.mov frames_placesaintmichel/1585/frame_%05d.png
ffmpeg -i videos_placesaintmichel/IMG_1585.MOV -vf scale=480:-1 videos_placesaintmichel/IMG_1585_preview.mov
ffmpeg -i videos_placesaintmichel/IMG_1585_preview.mov frames_placesaintmichel/1585_preview/frame_%05d.png

http://localhost:3012/fs-img?dir=/Volumes/Samsung_X5/frames_placesaintmichel/1585_preview/&img=frame_00003.png


ffmpeg -i videos_placesaintmichel/IMG_1581.mov -vf "rotate=-0.8*PI/180" -vcodec libx264 -crf 0 -preset medium videos_placesaintmichel/IMG_1581r.mp4
ffmpeg -i videos_placesaintmichel/IMG_1581r.mp4 frames_placesaintmichel/1581/frame_%05d.png
ffmpeg -i videos_placesaintmichel/IMG_1581r.mp4 -vf scale=480:-1 videos_placesaintmichel/IMG_1581r_preview.mp4
ffmpeg -i videos_placesaintmichel/IMG_1581r_preview.mp4 frames_placesaintmichel/1581_preview/frame_%05d.png
