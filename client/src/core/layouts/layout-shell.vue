<template>
  <div>
    <BaseBar />
    <BaseContent />
  </div>
</template>

<script>
import BaseContent from './base-content';
import BaseBar from './base-bar';

export default {
  name: 'LayoutShell',
  components: { BaseBar, BaseContent }
};
</script>
