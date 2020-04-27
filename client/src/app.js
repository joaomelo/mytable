import { Machine, interpret } from 'xstate';
import { router } from './core/router/router';

const appMachine = Machine({
  id: 'appMachine',
  initial: 'unsolved',
  states: {
    unsolved: {
      entry: ['renderUnsolved'],
      on: {
        UNVERIFIED: 'unverified',
        SIGNOUT: 'signedOut',
        SIGNIN: 'signedIn'
      }
    },
    signedOut: {
      entry: ['renderLogin'],
      on: {
        UNVERIFIED: 'unverified',
        SIGNIN: 'signedIn'
      }
    },
    unverified: {
      entry: ['renderUnverified'],
      on: {
        SIGNOUT: 'signedOut',
        SIGNIN: 'signedIn'
      }
    },
    signedIn: {
      entry: ['renderRun'],
      on: {
        SIGNOUT: 'signedOut'
      }
    }
  }
},
{
  actions: {
    renderUnsolved () {
      router.push({ name: 'unsolved' });
    },
    renderRun () {
      router.push({ name: 'run' });
    },
    renderUnverified () {
      router.push({ name: 'unverified' });
    },
    renderLogin () {
      router.push({ name: 'login' });
    }
  }

}

);

const appService = interpret(appMachine);

export { appService };
