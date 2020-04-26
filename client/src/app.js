import { Machine, interpret } from 'xstate';

const appMachine = Machine({
  id: 'appMachine',
  initial: 'unsolved',
  states: {
    unsolved: {
      on: {
        UNVERIFIED: 'unverified',
        SIGNOUT: 'signedOut',
        SIGNIN: 'signedIn'
      }
    },
    signedOut: {
      UNVERIFIED: 'unverified',
      SIGNIN: 'signedIn'
    },
    unverified: {
      SIGNOUT: 'signedOut',
      SIGNIN: 'signedIn'
    },
    signedIn: {
      SIGNOUT: 'signedOut'
    }
  }
});

const appService = interpret(appMachine);

// function navigateAfterUserStatusChange ({ user, status }) {
//   if (!user || status === 'UNSOLVED') return;

//   const state = (status === 'SIGNIN' && !user.emailVerified) ? 'UNVERIFIED' : status;
//   const routesByState = {
//     UNVERIFIED: 'unverified',
//     SIGNOUT: 'login',
//     SIGNIN: 'home'
//   };

//   const newRoute = routesByState[state];
//   const oldRoute = router.currentRoute.name;
//   if (newRoute !== oldRoute) {
//     router.push(newRoute);
//   }
// }

export { appService };
