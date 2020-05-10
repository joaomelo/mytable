<template>
  <div>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click="drawer = true" />

      <router-link :to="{ name: 'run' }">
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </router-link>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item :to="{ name: 'run' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'jobs' }">
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Jobs</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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
import { logout } from '__cli/core/auth';
export default {
  name: 'LayoutDesktop',
  data () {
    return {
      group: 1,
      drawer: null,
      title: `${appName()} ${appVersion()}`
    };
  },
  methods: {
    logout
  }
};
</script>
