<template>
  <v-app>
    <OverlayLoading />
    <router-view />
  </v-app>
</template>

<script>
import { OverlayLoading } from '__cli/core/loader';
export default {
  name: 'VueRoot',
  components: { OverlayLoading }
};
</script>
