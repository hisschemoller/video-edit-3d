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
* mkp_woman
  * start 3:23, eind 3:38, duur 0:15
  * uitsnede x:0, y:570, y2:875, w:1920, h:875-570=305
  * frames:450
  * ffmpeg -ss 00:03:26.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:01.0 tempframes.mp4
  * ffmpeg -i tempframes.mp4 tempframes/frame_%05d.png
  * ffmpeg -ss 00:03:23.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:15.0 mkp_woman_sliced.mp4
  * ffmpeg -i mkp_woman_sliced.mp4 -filter:v "crop=1920:305:0:570" mkp_woman_sliced_cropped.mp4
  * ffmpeg -i mkp_woman_sliced_cropped.mp4 mkp_woman/frame_%05d.png
  * ffmpeg -i mkp_woman_sliced_cropped.mp4 -vf scale=480:-1 mkp_woman_sliced_cropped_preview.mp4
  * ffmpeg -i mkp_woman_sliced_cropped_preview.mp4 mkp_woman_preview/frame_%05d.png
* mkp_woman_preview
  * w:480, h:76
* mkp_couple
  * start 7:41, eind 3:52, duur 0:11
  * uitsnede x:0, y:460, y2:996, w:1920, h:996-460=536
  * frames:329
  * ffmpeg -ss 00:07:44.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:01.0 tempframes.mp4
  * ffmpeg -i tempframes.mp4 tempframes/frame_%05d.png
  * ffmpeg -ss 00:07:41.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:11.0 mkp_couple_sliced.mp4
  * ffmpeg -i mkp_couple_sliced.mp4 -filter:v "crop=1920:536:0:460" mkp_couple_sliced_cropped.mp4
  * ffmpeg -i mkp_couple_sliced_cropped.mp4 mkp_couple/frame_%05d.png
  * ffmpeg -i mkp_couple_sliced_cropped.mp4 -vf scale=480:-1 mkp_couple_sliced_cropped_preview.mp4
  * ffmpeg -i mkp_couple_sliced_cropped_preview.mp4 mkp_couple_preview/frame_%05d.png
* mkp_couple_preview
  * w:480, h:134
* mkp_men
  * start 8:31, eind 8:45, duur 0:14
  * uitsnede x:0, y:490, y2:922, w:1920, h:922-490=432
  * frames:420
  * ffmpeg -ss 00:08:37.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:01.0 tempframes.mp4
  * ffmpeg -i tempframes.mp4 tempframes/frame_%05d.png
  * ffmpeg -ss 00:08:31.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:14.0 mkp_men_sliced.mp4
  * ffmpeg -i mkp_men_sliced.mp4 -filter:v "crop=1920:432:0:490" mkp_men_sliced_cropped.mp4
  * ffmpeg -i mkp_men_sliced_cropped.mp4 mkp_men/frame_%05d.png
  * ffmpeg -i mkp_men_sliced_cropped.mp4 -vf scale=480:-1 mkp_men_sliced_cropped_preview.mp4
  * ffmpeg -i mkp_men_sliced_cropped_preview.mp4 mkp_men_preview/frame_%05d.png
* mkp_man
  * start 9:00, eind 9:24, duur 0:24
  * uitsnede x:0, y:540, y2:850, w:1920, h:850-540=310
  * frames:720
  * ffmpeg -ss 00:09:03.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:01.0 tempframes.mp4
  * ffmpeg -i tempframes.mp4 tempframes/frame_%05d.png
  * ffmpeg -ss 00:09:00.0 -i matthaikirchplatz_lossless_noaudio_rotated_08.mp4 -c copy -t 00:00:24.0 mkp_man_sliced.mp4
  * ffmpeg -i mkp_man_sliced.mp4 -filter:v "crop=1920:310:0:540" mkp_man_sliced_cropped.mp4
  * ffmpeg -i mkp_man_sliced_cropped.mp4 mkp_man/frame_%05d.png
  * ffmpeg -i mkp_man_sliced_cropped.mp4 -vf scale=480:-1 mkp_man_sliced_cropped_preview.mp4
  * ffmpeg -i mkp_man_sliced_cropped_preview.mp4 mkp_man_preview/frame_%05d.png


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
