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
import { authMech } from '../domain';

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
      authState: authMech.state
    };
  },
  computed: {
    logoutText () {
      const userName = this.authState.userData && this.authState.userData.emailLocalPart;
      return (userName && this.showUser)
        ? `Logout from ${userName}`
        : 'Logout';
    }
  },
  methods: {
    logout () {
      authMech.signOut();
    }
  }
};
</script>
