<template>
  <v-btn
    v-bind="$attrs"
    @click="logout"
  >
    {{ text }}
  </v-btn>
</template>

<script>
import { fireauthMachine } from '../domain';

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
      const email = fireauthMachine.user.email;
      const username = email.substring(0, email.indexOf('@'));
      const logout = 'Logout';
      const result = this.showUser ? `${logout} from ${username}` : logout;
      return result;
    }
  },
  methods: {
    logout () {
      fireauthMachine.service.signOut();
    }
  }
};
</script>
