<template>
  <div>
    <BaseBar
      :is-active="true"
      title-route-name="run"
    />
    <BaseContent />
  </div>
</template>

<script>
import BaseBar from './base-bar';
import BaseContent from './base-content';

export default {
  name: 'LayoutDesktop',
  components: { BaseBar, BaseContent }

};
</script>
