<template>
  <div>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <v-app-bar-nav-icon
        v-if="isActive"
        @click="drawer = true"
      />

      <v-img
        alt="mt"
        src="/assets/logo.png"
        max-height="32"
        max-width="32"
        class="mr-2"
        contain
      />

      <router-link
        :to="{ name: titleRouteName }"
      >
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </router-link>

      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-if="isActive"
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

          <v-list-item :to="{ name: 'job' }">
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Job Setup</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'account' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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
  </div>
</template>

<script>
import { appTitle } from '__cli/core/meta';
import { logout } from '__cli/core/auth';

export default {
  name: 'BaseBar',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    titleRouteName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: appTitle(),
      group: 1,
      drawer: null
    };
  },
  methods: {
    logout
  }
};
</script>
