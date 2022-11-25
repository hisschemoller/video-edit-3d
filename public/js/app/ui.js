import { start, togglePlayPause } from './player.js';

let isPaused = false;

export function setup() {
  document.querySelector('#overlay button')?.addEventListener('click', () => {
    const frameFirst = parseInt(document.getElementById('firstframe').value, 10);
    const frameLast = parseInt(document.getElementById('lastframe').value, 10);
    start(frameFirst, frameLast);

    document.getElementById('overlay').remove();
  });

  // PAUSE / CONTINUE PLAYBACK
  document.getElementById('pause-toggle')?.addEventListener('click', () => {
    const el = document.getElementById('pause-toggle');
    isPaused = el.checked;
    togglePlayPause(isPaused);
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      isPaused = !isPaused;
      const el = document.getElementById('pause-toggle');
      el.checked = isPaused;
      togglePlayPause(isPaused);
    }
  });
}
