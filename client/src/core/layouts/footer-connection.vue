<template>
  <v-footer
    v-if="!isConnected"
    app
    padless
    color="error"
    class="justify-center white--text font-weight-bold"
  >
    Please check your connection to the internet
  </v-footer>
</template>

<script>
export default {
  name: 'FooterConnection',
  data () {
    return {
      isConnected: true
    };
  },
  mounted () {
    window.addEventListener('offline', () => {
      this.isConnected = false;
    });
    window.addEventListener('online', () => {
      this.isConnected = true;
    });
  }
};
</script>
