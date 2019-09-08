
let bpm,
  ppqn,
  numerator,
  denominator,
  secondsPerBeat,
  secondsPerPulse,
  secondsPerMeasure;

/**
 * 
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

export function timeToMusic() {

}
