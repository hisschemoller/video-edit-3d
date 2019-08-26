
import { setup as setupStore, persist } from './store/store.js';

async function main() {
  setupStore();
  
  persist();
}

main();