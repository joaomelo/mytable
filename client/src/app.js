import { Machine, interpret } from 'xstate';
import { renderSplash, initialize } from '__cli/core/init';

const appMachine = Machine({
  id: 'appMachine',
  initial: 'loading',
  states: {
    loading: {
      entry: ['renderSplash'],
      invoke: {
        id: 'initialize',
        src: initialize,
        onDone: 'running'
      }
    },
    running: {
      initial: 'unsolved',
      states: {
        unsolved: {},
        signedOut: {},
        unverified: {},
        signedIn: {}
      }
    }
  }
},
{
  actions: {
    renderSplash
  }
});

const appService = interpret(appMachine);

export { appService };
