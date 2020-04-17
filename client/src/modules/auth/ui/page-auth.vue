<template>
  <v-container fill-height>
    <v-row v-if="status==='SIGNOUT'">
      <v-col
        cols="12"
        align="center"
      >
        <DialogAuth
          v-bind="$attrs"
          disable-signup
        />
      </v-col>
    </v-row>
    <OverlayUnsolved v-else />
  </v-container>
</template>

<script>
import DialogAuth from './dialog-auth';
import OverlayUnsolved from './overlay-unsolved';
import { fireauthMachine } from '../domain';

export default {
  name: 'PageAuth',
  components: { DialogAuth, OverlayUnsolved },
  computed: {
    status: () => fireauthMachine.status
  }
};
</script>
