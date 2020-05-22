<template>
  <BaseDialog
    title="just a moment"
  >
    <template>
      <p>We are loading the app's features. It will take just a moment.</p>
    </template>
  </BaseDialog>
</template>

<script>
import { BaseDialog } from '__cli/core/base';

export default {
  name: 'PageSplash',
  components: { BaseDialog },
  data () {
    return {
      alertMessage: '',
      alertType: ''
    };
  }
};
</script>
