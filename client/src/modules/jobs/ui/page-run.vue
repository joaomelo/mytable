<template>
  <div>
    <PanelRun />
    <ListLogs class="mt-5" />
  </div>
</template>

<script>
import PanelRun from './panel-run';
import { ListLogs } from '__cli/modules/logger';
export default {
  name: 'PageRun',
  components: { ListLogs, PanelRun }
};
</script>
