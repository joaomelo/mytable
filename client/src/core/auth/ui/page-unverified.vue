<template>
  <LayoutDialog
    title="email confirmation"
    :alert-message="alertMessage"
    :alert-type="alertType"
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
  </LayoutDialog>
</template>

<script>
import { LayoutDialog } from '__cli/core/layouts';
import { sendEmailVerification } from '../domain';
import ButtonLogout from './button-logout';

export default {
  name: 'PageUnverified',
  components: { LayoutDialog, ButtonLogout },
  data () {
    return {
      alertMessage: '',
      alertType: ''
    };
  },
  methods: {
    sendEmailVerification () {
      sendEmailVerification().then(payload => {
        this.alertMessage = payload.message;
        this.alertType = payload.isSuccess ? 'info' : 'error';
      });
    }
  }
};
</script>
