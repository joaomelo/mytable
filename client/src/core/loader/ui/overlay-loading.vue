<template>
  <v-overlay
    v-if="isLoading"
    z-index="10"
  >
    <v-progress-circular
      indeterminate
      size="64"
    />
  </v-overlay>
</template>

<script>
import { loader } from '../domain';
export default {
  name: 'OverlayLoading',
  data () {
    return {
      loader
    };
  },
  computed: {
    isLoading () {
      return this.loader.status === 'LOADING';
    }
  }
};
</script>
