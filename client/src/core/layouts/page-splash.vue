<template>
  <LayoutDialog
    title="just a moment"
  >
    <template>
      <p>We are loading the app's features. It will take just a moment.</p>
    </template>
  </LayoutDialog>
</template>

<script>
import { LayoutDialog } from '__cli/core/layouts';

export default {
  name: 'PageSplash',
  components: { LayoutDialog },
  data () {
    return {
      alertMessage: '',
      alertType: ''
    };
  }
};
</script>
