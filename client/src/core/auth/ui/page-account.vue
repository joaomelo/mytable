<template>
  <BaseDialog
    :message="alertMessage"
    :message-type="alertType"
  >
    <template>
      <v-form ref="form">
        <ControlEmail
          v-model="newEmail"
          label="Email"
        />
        <ControlPassword
          v-model="password"
          label="Provide Password to Confirm"
        />
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn
        color="secondary"
        @click="cancel"
      >
        <v-icon left>
          mdi-backspace
        </v-icon>
        Back
      </v-btn>
      <v-btn
        color="success"
        @click="save"
      >
        <v-icon left>
          mdi-content-save
        </v-icon>
        Save
      </v-btn>
    </template>
  </BaseDialog>
</template>
<script>
import { loader } from '__cli/core/loader';
import { BaseDialog } from '__cli/core/base';
import { authStore, updateEmail } from '../domain';
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
      newEmail: authStore.state.user.email,
      password: null,
      alertMessage: '',
      alertType: 'error'
    };
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        loader.start();
        updateEmail(this.newEmail, this.password)
          .then(msg => {
            if (msg) {
              this.alertMessage = msg;
              this.alertType = 'error';
            } else {
              this.alertMessage = 'We sent you a e-mail verification message';
              this.alertType = 'info';
            }
          })
          .finally(() => loader.stop());
      }
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
