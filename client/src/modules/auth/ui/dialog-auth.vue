<template>
  <div>
    <v-card
      max-width="350px"
      min-width="250px"
    >
      <v-card-title
        v-if="title"
        class="justify-center"
      >
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-tabs
          v-if="!disableSignup"
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
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          @click="runAuthAction"
        >
          {{ outfit.button }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-alert
      v-if="authError"
      type="error"
      text
      class="mt-6"
    >
      {{ authError.message }}
    </v-alert>
  </div>
</template>

<script>
import { authMachine } from '../domain';
import ControlEmail from './control-email';
import ControlPassword from './control-password';

export default {
  name: 'DialogAuth',
  components: {
    ControlEmail,
    ControlPassword
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    disableSignup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tab: 0,
      email: null,
      password: null,
      authError: null
    };
  },
  computed: {
    outfit () {
      const options = {
        0: {
          mode: 'LOGIN',
          button: 'Log In',
          action: 'signInWithEmailAndPassword',
          shouldMatch: false
        },
        1: {
          mode: 'SIGNUP',
          button: 'Create user',
          action: 'createUserWithEmailAndPassword',
          shouldMatch: true
        }
      };

      return options[this.tab];
    }
  },
  methods: {
    runAuthAction (actionName) {
      if (this.$refs.form.validate()) {
        authMachine.service[this.outfit.action](this.email, this.password)
          .catch(e => { this.authError = e; });
      }
    }
  }
};
</script>
