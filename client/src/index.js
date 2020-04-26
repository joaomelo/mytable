import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { initFirebase } from '__cli/core/firebase';
import { initVue } from '__cli/core/vue';
import { initFireauthMachine } from '__cli/core/auth';
import { appService } from './app';

appService
  .onTransition(state => { console.log(state.value); })
  .start();

initVue();
initFirebase();
initFireauthMachine();
