import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueRouter from 'vue-router';
import { appEnviroment } from '__cli/core/meta';
import { createRouter } from '__cli/core/router';
import VueRoot from './vue-root';

function initVue () {
  Vue.use(Vuetify);
  const vuetify = new Vuetify({});

  Vue.use(VueRouter);
  const router = createRouter(VueRouter);

  Vue.config.productionTip = false;
  Vue.config.silent = appEnviroment() === 'prod';

  const vueRoot = new Vue({
    router,
    vuetify,
    render: h => h(VueRoot)
  });

  vueRoot.$mount('#app');
}

export { initVue };
