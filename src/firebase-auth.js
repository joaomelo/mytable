import { firebase, fireApp } from './firebase';
import * as firebaseui from 'firebaseui';

import router from './router';
import store from './store';

export { firebaseAuthPlugin };

const uiConfig = {
  signInSuccessUrl: '/',
  callbacks: {
    signInSuccessWithAuthResult(authResult) {
      router.push('/');
      return false;
    }
  },
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};

const auth = fireApp.auth();
async function logout() {
  await auth.signOut();
  router.push('/login');
}

const firebaseAuthPlugin = {
  install(Vue) {
    Vue.prototype.$auth = {
      startLoginUi(elementId) {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (ui) {
          ui.reset();
        } else {
          ui = new firebaseui.auth.AuthUI(fireApp.auth());
        }
        ui.start(`#${elementId}`, uiConfig);
      },
      async logout() {
        await logout();
      }
    };

    auth.onAuthStateChanged(user => {
      store.commit('setUser', { user });
      if (!user) {
        logout();
      }
    });
  }
};
