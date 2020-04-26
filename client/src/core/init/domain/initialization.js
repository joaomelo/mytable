import { loadCore } from './core';
import { loadLibs } from './libs';

function initialize () {
  return loadCore().then(() => loadLibs());
}

export { initialize };
