import { routes } from './routes';

let router;

function createRouter (VueRouter) {
  router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

  return router;
}

// getFireauthMachine().then(fireauthMachine => {
//   router.beforeEach((to, from, next) => {
//     const isGoingToOpenRoute = to.name === 'login';
//     const isSignedIn = fireauthMachine.status === 'SIGNIN';
//     const isFreeToGo = isGoingToOpenRoute || isSignedIn;

//     if (isFreeToGo) {
//       next();
//     } else {
//       next(false);
//     }
//   });
// });

export { createRouter, router };
