import { firebase, fireApp } from '../airtable/firebase';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';

import router from '../router';
import store from '../store';

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult () {
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

const firebaseAuthPlugin = {
  install (Vue) {
    Vue.prototype.$auth = {
      isUserResolved: false,
      startLoginUi (elementId) {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (ui) {
          ui.reset();
        } else {
          ui = new firebaseui.auth.AuthUI(fireApp.auth());
        }
        ui.start(`#${elementId}`, uiConfig);
      },
      async logout () {
        await auth.signOut();
      }
    };

    auth.onAuthStateChanged(user => {
      Vue.prototype.$auth.isUserSolved = true;
      store.commit('setUser', user);
      if (!user && router.currentRoute.name !== 'login') {
        router.push({ name: 'login' });
      } else if (user && router.currentRoute.name !== 'home') {
        router.push({ name: 'home' });
      }
    });
  }
};

export { firebaseAuthPlugin };
