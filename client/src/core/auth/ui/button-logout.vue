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
import { getFireauthMachine } from '../domain';

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
      logoutText: 'Logout'
    };
  },
  mounted () {
    if (this.showUser) {
      getFireauthMachine().then(fireauthMachine => {
        if (fireauthMachine.user) {
          const email = fireauthMachine.user.email;
          const username = email.substring(0, email.indexOf('@'));
          this.logoutText = `${this.logoutTag} from ${username}`;
        }
      });
    }
  },
  methods: {
    async logout () {
      loader.start();
      const fireauthMachine = await getFireauthMachine();
      await fireauthMachine.service.signOut();
      loader.stop();
    }
  }
};
</script>
