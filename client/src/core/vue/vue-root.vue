<template>
  <div>
    <OverlayLoading />
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import { OverlayLoading } from '__cli/core/loader';
export default {
  name: 'VueRoot',
  components: { OverlayLoading }
};
</script>
