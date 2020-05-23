<template>
  <div>
    <BaseDialog
      :message="emailAlertMessage"
      :message-type="emailAlertType"
    >
      <template>
        <v-form ref="emailForm">
          <h2>Update Email</h2>
          <ControlEmail
            v-model="newEmail"
            class="mt-3"
            label="Email"
          />
          <ControlPassword
            v-model="password"
            class="mt-3"
            label="Confirm with Current Password"
          />
        </v-form>
      </template>
      <template v-slot:actions>
        <ControlButton
          color="secondary"
          icon="mdi-backspace"
          text="Back"
          @click="cancel"
        />
        <ControlButton
          color="success"
          icon="mdi-content-save"
          text="Update Email"
          @click="updateEmail"
        />
      </template>
    </BaseDialog>
    <BaseDialog
      :message="passwordAlertMessage"
      :message-type="passwordAlertType"
      class="mt-8"
    >
      <template>
        <h2>Update Password</h2>
        <v-form ref="passwordForm">
          <ControlPassword
            v-model="newPassword"
            class="mt-3"
            :should-match="true"
          />
          <v-divider class="my-5" />
          <ControlPassword
            v-model="password"
            class="mt-3"
            label="Confirm with Current Password"
          />
        </v-form>
      </template>
      <template v-slot:actions>
        <ControlButton
          color="secondary"
          icon="mdi-backspace"
          text="Back"
          @click="cancel"
        />
        <ControlButton
          color="success"
          icon="mdi-content-save"
          text="Update Password"
          @click="updatePassword"
        />
      </template>
    </BaseDialog>
  </div>
</template>
<script>
import { loader } from '__cli/core/loader';
import { BaseDialog, ControlButton } from '__cli/core/base';
import { authStore, updateEmail, updatePassword } from '../domain';
import ControlEmail from './control-email';
import ControlPassword from './control-password';

export default {
  name: 'PageAccount',
  components: {
    BaseDialog,
    ControlEmail,
    ControlPassword,
    ControlButton
  },
  data () {
    return {
      newEmail: authStore.state.user.email,
      newPassword: null,
      password: null,
      emailAlertMessage: '',
      emailAlertType: 'error',
      passwordAlertMessage: '',
      passwordAlertType: 'error'
    };
  },
  methods: {
    updateEmail () {
      if (this.$refs.emailForm.validate()) {
        loader.start();
        updateEmail(this.newEmail, this.password)
          .then(msg => {
            if (msg) {
              this.emailAlertMessage = msg;
              this.emailAlertType = 'error';
            } else {
              this.emailAlertMessage = 'We sent you a e-mail verification message';
              this.emailAlertType = 'info';
            }
          })
          .finally(() => loader.stop());
      }
    },
    updatePassword () {
      if (this.$refs.passwordForm.validate()) {
        loader.start();
        updatePassword(this.newPassword, this.password)
          .then(msg => {
            if (msg) {
              this.passwordAlertMessage = msg;
              this.passwordAlertType = 'error';
            } else {
              this.passwordAlertMessage = 'Password updated';
              this.passwordAlertType = 'info';
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
