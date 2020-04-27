import { Machine, interpret } from 'xstate';
import { router } from '__cli/core/router/router';
import { initJobsCollection } from '__cli/modules/jobs';
import { initLogsCollection } from '__cli/modules/logger';

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
      entry: ['renderRun', 'initCollections'],
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
    initCollections () {
      initLogsCollection();
      initJobsCollection();
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
