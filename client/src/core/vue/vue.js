import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { appEnviroment } from '__cli/core/meta';
import { router } from '__cli/core/router';
import VueRoot from './vue-root';

Vue.use(Vuetify);
const vuetify = new Vuetify({});

Vue.config.productionTip = false;
Vue.config.silent = appEnviroment() === 'prod';

const vueRoot = new Vue({
  router,
  vuetify,
  render: h => h(VueRoot)
});

vueRoot.$mount('#app');
