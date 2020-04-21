import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import { appEnviroment } from './core/meta';
import { vuetify } from './core/plugins';
import { initRouter } from './core/router';
import App from './app';

Vue.config.productionTip = false;
Vue.config.silent = appEnviroment === 'prod';

const router = initRouter();
const vueApp = new Vue({
  vuetify,
  router,
  render: h => h(App)
});

vueApp.$mount('#app');
