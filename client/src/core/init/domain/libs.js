async function loadLibs () {
  console.log('test');
}

export { loadLibs };

// import { initFirebase } from '__cli/core/services';
// import { initFireauthMachine } from '__cli/core/auth';

// import Vue from '__cli/core/init/domain/vue';
// import { appEnviroment } from './core/meta';
// import { router } from './core/router';
// import { vuetify } from './core/services';
// import App from './core/app';

// async function initialize () {
//   loadFirebaseAndAuth();
// }

// async function loadFirebaseAndAuth () {
//   await initFirebase();
//   return initFireauthMachine();
// }

// export { initialize };

// Vue.config.productionTip = false;
// Vue.config.silent = appEnviroment() === 'prod';

// const vueApp = new Vue({
//   router,
//   vuetify,
//   render: h => h(App)
// });

// vueApp.$mount('#app');
