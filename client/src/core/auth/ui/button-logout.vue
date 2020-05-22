<template>
  <v-btn
    v-bind="$attrs"
    @click="logout"
  >
    <v-icon left>
      mdi-logout
    </v-icon>
    {{ logoutText }}
  </v-btn>
</template>

<script>
import { authStore, logout } from '../domain';

export default {
  name: 'ButtonLogout',
  props: {
    showUser: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      logoutText: 'Logout'
    };
  },
  mounted () {
    authStore.subscribe(({ userName }) => {
      this.logoutText = (userName && this.showUser) ? `Logout from ${userName}` : 'Logout';
    });
  },
  methods: {
    logout () {
      logout();
    }
  }
};
</script>
