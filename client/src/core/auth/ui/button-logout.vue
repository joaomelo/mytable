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
import { usernameSubject, logout } from '../domain';

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
    usernameSubject.subscribe(username => {
      this.logoutText = (username && this.showUser) ? `Logout from ${username}` : 'Logout';
    });
  },
  methods: {
    logout () {
      logout();
    }
  }
};
</script>
