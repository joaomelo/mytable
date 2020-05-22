import Vue from 'vue';
import VueRouter from 'vue-router';
import { authSubject } from '__cli/core/auth';
import { routes } from './routes';

Vue.use(VueRouter);

let currentStatus;
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

authSubject.subscribe(({ status }) => {
  currentStatus = status;
  const routesForStatus = {
    UNSOLVED: 'loading',
    UNVERIFIED: 'unverified',
    SIGNOUT: 'login',
    SIGNIN: 'run'
  };

  const currentName = router.currentRoute.name;
  const nextName = routesForStatus[status];

  if (currentName !== nextName) {
    router.push({ name: nextName });
  }
});

router.beforeEach((to, from, next) => {
  const openRouteNames = ['loading', 'login', 'unverified'];
  const isGoingToOpenRoute = openRouteNames.includes(to.name);
  const isSignedIn = currentStatus === 'SIGNIN';
  const isFreeToGo = isGoingToOpenRoute || isSignedIn;

  if (isFreeToGo) {
    next();
  } else {
    next(false);
  }
});

export { router };
