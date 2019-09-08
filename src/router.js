import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './dashboard.vue';
import Login from './login.vue';
import NotFound from './not-found.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
      meta: {
        authRequired: true
      }
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
  const authRequired = to.matched.some(record => record.meta.authRequired);
  const loggedIn = store.getters.isLoggedIn;
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
