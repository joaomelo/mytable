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
import { sendEmailVerification } from '../domain';
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
      sendEmailVerification()
        .then(payload => {
          this.alertMessage = payload.message;
          this.alertType = payload.isSuccess ? 'info' : 'error';
          console.log(payload);
        })
        .finally(() => loader.stop());
    }
  }
};
</script>
