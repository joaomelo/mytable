import Vue from 'vue';
import VueRouter from 'vue-router';
import { getFireauthMachine } from '__cli/core/auth';
import { routes } from './routes';

function initRouter () {
  Vue.use(VueRouter);
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });

  getFireauthMachine().then(fireauthMachine => {
    fireauthMachine.subscribe(({ status }) => {
      const statusRoutes = {
        UNSOLVED: 'login',
        SIGNOUT: 'login',
        SIGNIN: 'home'
      };

      const newRoute = statusRoutes[status];
      const oldRoute = router.currentRoute.name;
      if (newRoute !== oldRoute) {
        router.push(newRoute);
      }
    });

    router.beforeEach((to, from, next) => {
      const isGoingToOpenRoute = to.name === 'login';
      const isSignedIn = fireauthMachine.status === 'SIGNIN';
      const isFreeToGo = isGoingToOpenRoute || isSignedIn;

      if (isFreeToGo) {
        next();
      } else {
        next(false);
      }
    });
  });

  return router;
}

export { initRouter };
