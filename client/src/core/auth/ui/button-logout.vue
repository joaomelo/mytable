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
import { loader } from '__cli/core/loader';
import { fireauthMachine } from '../domain';

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
      logoutTag: 'Logout',
      logoutText: null
    };
  },
  mounted () {
    if (this.showUser) {
      const email = fireauthMachine.user.email;
      const username = email.substring(0, email.indexOf('@'));
      this.logoutText = `${this.logoutTag} from ${username}`;
    } else {
      this.logoutText = this.logoutTag;
    }
  },
  methods: {
    logout () {
      loader.start();
      fireauthMachine.service.signOut().then(() => loader.stop());
    }
  }
};
</script>
