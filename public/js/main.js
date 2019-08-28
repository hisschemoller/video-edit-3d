
import { setup as setupStore, persist } from './store/store.js';
import { setup as setupWebGL } from './world/webgl.js';

async function main() {
  setupStore();
  setupWebGL();
  
  persist();
}

main();