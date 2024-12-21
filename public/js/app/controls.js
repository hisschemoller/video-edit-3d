import { getCanvas } from './world.js';

const infoTimeEl = document.querySelector('#controls2').querySelector('#info__time');
const infoFrameEl = document.querySelector('#controls2').querySelector('#info__frame');

/**
 * Create blob.
 * @param {*} dataURI 
 */
function dataURIToBlob(dataURI) {
  const binStr = window.atob(dataURI.split(',')[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new window.Blob([arr]);
}

/**
 * Create filename.
 * @param {String} ext File extension.
 */
function defaultFileName (ext) {
  const str = `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}${ext}`;
  return str.replace(/\//g, '-').replace(/:/g, '.');
}

/**
 * Save canvas as image file.
 */
function saveAsImage() {
  const dataURI = getCanvas().toDataURL('image/png');
  const blob = dataURIToBlob( dataURI );

  // force download
  const link = document.createElement( 'a' );
  link.download = defaultFileName('.png');
  link.href = window.URL.createObjectURL( blob );
  link.onclick = () => {
    window.setTimeout( () => {
      window.URL.revokeObjectURL( blob );
      link.removeAttribute( 'href' );
    }, 500 );

  };
  link.click();
}

/**
 * Write info message.
 * @param {Number} position 
 */
export function showPosition(position, frame) {
  infoTimeEl.textContent = (position / 1000).toFixed(2);
  infoFrameEl.textContent = Math.round((position / 1000) * frame);
}

/**
 * Module setup.
 */
// export function setup() {

  document.querySelector('#save-image').addEventListener('click', e => {
    saveAsImage();
  });
// }
