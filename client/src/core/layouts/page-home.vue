<template>
  <div>
    <PanelRun />
    <ListLogs class="mt-5" />
  </div>
</template>

<script>
import { PanelRun } from '__cli/modules/jobs';
import { ListLogs } from '__cli/modules/logger';
export default {
  name: 'PageHome',
  components: { ListLogs, PanelRun }
};
</script>
