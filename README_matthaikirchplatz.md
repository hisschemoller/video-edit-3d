# Matthaikirchplatz

## VIDEO

Previews zijn altijd 25% van het origineel.

* mkp
  * matthaikirchplatz_lossless_noaudio_rotated_08.mp4
  * w:1920, h:1080
  * frames:16906
* mkp_preview
  * matthaikirchplatz_lossless_noaudio_rotated_08_preview.mp4
  * w:480, h:270
* mkp_dame
  * start 3:23, eind 3:38, duur 0:15
  * uitsnede x:0, y:570, y2:875, w:1920, h:875-570=305
  * ffmpeg -ss 00:03:26.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:01.0 tempframes.mp4
  * ffmpeg -i tempframes.mp4 tempframes/frame_%05d.png
  * ffmpeg -ss 00:03:23.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:15.0 mkp_dame_sliced.mp4
  * ffmpeg -i mkp_dame_sliced.mp4 -filter:v "crop=1920:305:0:570" mkp_dame_sliced_cropped.mp4
  * ffmpeg -i mkp_dame_sliced_cropped.mp4 mkp_dame/frame_%05d.png
  * ffmpeg -i mkp_dame_sliced_cropped.mp4 -vf scale=480:-1 mkp_dame_sliced_cropped_preview.mp4
  * ffmpeg -i mkp_dame_sliced_cropped_preview.mp4 mkp_dame_preview/frame_%05d.png
  * frames:450
* mkp_dame_preview
  * w:480, h:76


## FFMPEG

* MOV to MP4
  * `ffmpeg -i matthaikirchplatz.mov -vcodec copy -acodec copy matthaikirchplatz_lossless.mp4`
* Remove audio
  * `ffmpeg -i matthaikirchplatz_lossless.mp4 -vcodec copy -an matthaikirchplatz_lossless_noaudio.mp4`
* Rotate 0.8 degrees clockwise
  * `ffmpeg -i matthaikirchplatz_lossless_noaudio.mp4 -vf rotate=0.8*PI/180 -vcodec libx264 -crf 0 -preset medium matthaikirchplatz_lossless_noaudio_rotated.mp4`
* Scale to 25% preview
  * `ffmpeg -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -vf scale=480:-1 matthaikirchplatz_lossless_noaudio_rotated_08_preview.mp4`
* Convert preview to PNG sequence
  * `ffmpeg -i matthaikirchplatz_lossless_noaudio_rotated_08_preview.mp4 mkp_preview/output_%05d.png`
  * 16906 frames, last file `output_16906.png`
