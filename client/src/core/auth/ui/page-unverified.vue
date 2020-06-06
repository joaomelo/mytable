<template>
  <BaseDialog
    title="email confirmation"
    :message="alertMessage"
    :message-type="alertType"
  >
    <template>
      <p>Please confirm your e-mail address by clicking in the message link we sent to you.</p>
      <p>If you don't the see the email in your inbox, make sure to check the spam folder.</p>
    </template>
    <template v-slot:actions>
      <ButtonLogout />
      <v-btn
        color="info"
        @click="sendEmailVerification"
      >
        Resend e-mail
      </v-btn>
    </template>
  </BaseDialog>
</template>

<script>
import { loader } from '__cli/core/loader';
import { BaseDialog } from '__cli/core/base';
import { authMech } from '../domain';
import ButtonLogout from './button-logout';

export default {
  name: 'PageUnverified',
  components: { BaseDialog, ButtonLogout },
  data () {
    return {
      alertMessage: '',
      alertType: ''
    };
  },
  methods: {
    sendEmailVerification () {
      loader.start();
      authMech.sendEmailVerification()
        .then(() => {
          this.alertType = 'info';
          this.alertMessage = 'email successfully sent';
        })
        .catch(error => {
          this.alertType = 'error';
          this.alertMessage = error.message;
          console.error(error);
        })
        .finally(() => loader.stop());
    }
  }
};
</script>
