import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { initFirebase } from '__cli/core/firebase';
import { initVue } from '__cli/core/vue';
import { initFireauthMachine } from '__cli/core/auth';
import { appService } from './app';

// vue init has to be first because fo the router.
// it is used in the state machine to update the ui
initVue();

appService
  .onTransition(state => { console.log(state.value); })
  .start();

initFirebase();
initFireauthMachine(appService);
