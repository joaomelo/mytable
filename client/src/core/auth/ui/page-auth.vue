<template>
  <v-container fill-height>
    <v-row>
      <v-col
        cols="12"
        align="center"
      >
        <div
          max-width="350px"
          min-width="250px"
        >
          <v-card>
            <v-card-title
              v-if="title"
              class="justify-center"
            >
              {{ title }}
            </v-card-title>
            <v-card-text>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fireauthMachine } from '../domain';
import ControlEmail from './control-email';
import ControlPassword from './control-password';

export default {
  name: 'PageAuth',
  components: {
    ControlEmail,
    ControlPassword
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      enableSignup: process.env.SIGN_UP === 'ENABLE',
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
        fireauthMachine.service[this.outfit.action](this.email, this.password)
          .catch(e => { this.authError = e; });
      }
    }
  }
};
</script>
