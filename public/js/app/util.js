
let bpm,
  ppqn,
  numerator,
  denominator,
  secondsPerBeat,
  secondsPerPulse,
  secondsPerMeasure;

/**
 * Store timing of the piece to be able to convert musical notation to time.
 * @export
 * @param {Number} BPM // beats per minute
 * @param {Number} ppqn // parts per quarter note
 * @param {Number} timeSignatureNumerator //number of beats in a measure
 * @param {Number} timeSignatureDenominator // length of a beat (4 = quarter note, 8 = eight note)
 */
export function setTiming (BPM, PPQN, timeSignatureNumerator, timeSignatureDenominator) {
  bpm = BPM;
  ppqn = PPQN;
  numerator = timeSignatureNumerator;
  denominator = timeSignatureDenominator;

  const pulsesPerBeat = ppqn * (4 / denominator),
      pulsesPerMeasure = pulsesPerBeat * denominator;

  secondsPerBeat = 60 / bpm,
  secondsPerPulse = secondsPerBeat / pulsesPerBeat,
  secondsPerMeasure = pulsesPerMeasure * secondsPerPulse;
}

/**
 * Convert musical time notation into seconds.
 * @export
 * @param {String} timestamp Musical time as 'n:n:n', measures:beats:parts.
 * @returns {Number} Time in seconds.
 */
export function musicToTime(timestamp) {
  if (typeof timestamp === 'string') {
    const timeArray = timestamp.split(':');
    return (parseInt(timeArray[0]) * secondsPerMeasure) +
      (parseInt(timeArray[1]) * secondsPerBeat) +
      (parseInt(timeArray[2]) * secondsPerPulse);
  } else if(typeof timestamp === 'number') {
    return timestamp;
  }
  return 0;
}

/**
 * Convert all animation times from seconds to milliseconds.
 * @export
 * @param {Array} score Score clips.
 * @returns {Array} The same array with the times converted.
 */
export function convertToMilliseconds(score) {
  score.forEach(scene => {
    scene.lifespan = scene.lifespan.map(time => time * 1000);
    // if (scene.animations && scene.animations.length) {
    //   scene.animations.forEach(animation => {
    //     animation.tracks.forEach(track => {
    //       track.keys.forEach(key => ({ ...key, time: key.time * 1000}));
    //     });
    //   });
    // }
  });
  console.log(score);
  return score;
}

/**
 * Sort score so lifespan starttimes are chronological.
 * @export
 * @param {Array} score Score clips.
 * @returns {Array} The same array with the score clips sorted.
 */
export function sortScoreByLifespanStart(score) {
  return score.sort((a, b) => a.lifespan[0] - b.lifespan[0]);
}

/**
 * Create unique ID
 * @see https://stackoverflow.com/a/2117523
 * @export
 * @returns {String} ID.
 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
