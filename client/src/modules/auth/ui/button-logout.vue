<template>
  <v-btn
    v-bind="$attrs"
    @click="logout"
  >
    {{ text }}
  </v-btn>
</template>

<script>
import { authMachine } from '../domain';

export default {
  name: 'ButtonLogout',
  props: {
    showUser: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    text () {
      const email = authMachine.user.email;
      const username = email.substring(0, email.indexOf('@'));
      const logout = 'Logout';
      const result = this.showUser ? `${logout} from ${username}` : logout;
      return result;
    }
  },
  methods: {
    logout () {
      authMachine.service.signOut();
    }
  }
};
</script>
