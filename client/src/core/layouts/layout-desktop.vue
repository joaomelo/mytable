<template>
  <div>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <router-link :to="{ name: 'run' }">
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-btn
        :to="{ name: 'jobs' }"
        text
        class="ml-2"
      >
        <v-icon left>
          mdi-run
        </v-icon>
        Jobs
      </v-btn>
      <ButtonLogout
        text
      />
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        style="max-width: 500px;"
      >
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { appName, appVersion } from '__cli/core/meta';
import { ButtonLogout } from '__cli/core/auth';
export default {
  name: 'LayoutDesktop',
  components: { ButtonLogout },
  data () {
    return {
      title: `${appName()} ${appVersion()}`
    };
  }
};
</script>
