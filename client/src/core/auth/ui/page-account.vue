<template>
  <BaseDialog
    :message="alertMessage"
  >
    <template>
      <v-form ref="form">
        <ControlEmail
          v-model="newEmail"
          label="New Email"
        />
        <ControlPassword
          v-model="password"
        />
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn
        color="secondary"
        @click="cancel"
      >
        <v-icon left>
          mdi-cancel
        </v-icon>
        Cancel
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
import { BaseDialog } from '__cli/core/base';
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
      newEmail: null,
      password: null,
      alertMessage: ''
    };
  },
  methods: {
    save () {
      // change email if everything of ok
      this.$router.go(-1);
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
