<template>
  <div id="login-ui-container-id"></div>
</template>

<script>
import { fireApp, emailProvider } from "./firebase";
import * as firebaseui from "firebaseui";

import router from "./router";
import store from "./store";

export default {
  name: "Login",
  mounted() {
    const uiConfig = {
      signInSuccessUrl: "/",
      callbacks: {
        signInSuccessWithAuthResult(authResult) {
          store.commit("setUser", authResult.user);
          router.push("/");
          return false;
        }
      },
      signInOptions: [
        {
          provider: emailProvider,
          requireDisplayName: false
        }
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };

    let ui = firebaseui.auth.AuthUI.getInstance();

    if (ui) {
      ui.reset();
    } else {
      ui = new firebaseui.auth.AuthUI(fireApp.auth());
    }
    ui.start("#login-ui-container-id", uiConfig);
  }
};
</script>

<style src="firebaseui/dist/firebaseui.css"></style>