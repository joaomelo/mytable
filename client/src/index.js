import { appService } from './app';

appService
  .onTransition(state => { console.log(state.value); })
  .start();
