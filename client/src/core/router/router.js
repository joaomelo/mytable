import Vue from 'vue';
import VueRouter from 'vue-router';

import { fireauthMachine } from '__cli/modules/auth';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

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

export { router };
