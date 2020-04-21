<template>
  <div>
    <OverlayLoading />
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import { OverlayLoading } from './core/loader';
export default {
  name: 'App',
  components: { OverlayLoading }
};
</script>
