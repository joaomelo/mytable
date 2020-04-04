import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './dashboard.vue';
import Login from './login.vue';
import Loading from './loading.vue';
import NotFound from './not-found.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!router.app.$auth.isUserSolved && to.name !== 'loading') {
    next('/loading');
  } else {
    next();
  }
});

export default router;
