import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

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

export { router };
