<template>
  <div>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="primary--text"
        >
          <v-list-item
            v-for="(link, i) in drawerLinks"
            :key="i"
          >
            <v-list-item-icon><v-icon v-text="link.icon" /></v-list-item-icon>
            <v-list-item-content><v-list-item-title v-text="link.text" /></v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
import { appName, appVersion } from '__cli/core/meta'; ;
export default {
  name: 'LayoutDesktop',
  data () {
    return {
      title: `${appName()} ${appVersion()}`,
      drawer: null,
      group: 0,
      drawerLinks: [
        {
          icon: 'mdi-home',
          text: 'Home',
          route: 'desktop'
        },
        {
          icon: 'mdi-account',
          text: 'Account',
          route: 'profile'
        },
        {
          icon: 'mdi-account',
          text: 'Logout',
          route: 'logout'
        }
      ]
    };
  }
};
</script>
