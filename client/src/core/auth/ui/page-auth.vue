<template>
  <div>
    <BaseDialog
      :message="alertMessage"
    >
      <template>
        <v-tabs
          v-if="enableSignup"
          v-model="tab"
          grow
        >
          <v-tab>Login</v-tab>
          <v-tab>Sign Up</v-tab>
        </v-tabs>
        <v-form ref="form">
          <ControlEmail
            v-model="email"
          />
          <ControlPassword
            v-model="password"
            :should-match="outfit.shouldMatch"
          />
        </v-form>
      </template>
      <template v-slot:actions>
        <v-btn
          color="success"
          @click="runAuthAction"
        >
          {{ outfit.button }}
        </v-btn>
      </template>
    </BaseDialog>
    <v-alert
      text
      type="warning"
      class="mt-8"
    >
      Mytable is a web app that complements <a href="https://www.airtable.com">Airtable</a> workflow with scripts that enable organizing items in a tree structure and automate the basic creation of recursive tasks. I use this personal instance regularly and you are welcome to freely sign up for an account. But since this is a hobby project, i can't guarantee any service level. The most reliable way to use the app is check the open sourced code in <a href="https://github.com/joaomelo/mytable">GitHub</a> and raise your own instance.
    </v-alert>
  </div>
</template>
<script>
import { loader } from '__cli/core/loader';
import { BaseDialog } from '__cli/core/base';
import { authMech } from '../domain';
import ControlEmail from './control-email';
import ControlPassword from './control-password';

export default {
  name: 'PageAuth',
  components: {
    BaseDialog,
    ControlEmail,
    ControlPassword
  },
  data () {
    return {
      enableSignup: process.env.SIGN_UP === 'ENABLE',
      tab: 0,
      email: null,
      password: null,
      alertMessage: ''
    };
  },
  computed: {
    outfit () {
      const options = {
        0: {
          mode: 'LOGIN',
          button: 'Log In',
          action: 'signIn',
          shouldMatch: false
        },
        1: {
          mode: 'SIGNUP',
          button: 'Create user',
          action: 'signUp',
          shouldMatch: true
        }
      };

      return options[this.tab];
    }
  },
  methods: {
    runAuthAction () {
      if (this.$refs.form.validate()) {
        loader.start();
        const method = this.outfit.action;
        authMech[method](this.email, this.password)
          .catch(e => {
            console.error(e);
            this.alertMessage = e.message;
          })
          .finally(() => loader.stop());
      }
    }
  }
};
</script>
