<template>
  <BaseDialog
    :alert-message="alertMessage"
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
</template>
<script>
import { BaseDialog } from '__cli/core/base';
import { signIn, signUp } from '../domain';
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
          action: signIn,
          shouldMatch: false
        },
        1: {
          mode: 'SIGNUP',
          button: 'Create user',
          action: signUp,
          shouldMatch: true
        }
      };

      return options[this.tab];
    }
  },
  methods: {
    runAuthAction (actionName) {
      if (this.$refs.form.validate()) {
        this.outfit.action({ email: this.email, password: this.password })
          .catch(e => { this.alertMessage = e; });
      }
    }
  }
};
</script>
