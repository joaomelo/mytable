import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';

import { firebaseAuthPlugin } from './firebase-auth.js';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(firebaseAuthPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
