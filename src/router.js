import Vue from 'vue';
import Router from 'vue-router';
import UpdateDashboard from './update-dashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: UpdateDashboard
    }
  ]
});
