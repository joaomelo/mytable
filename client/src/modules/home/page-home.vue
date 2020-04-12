<template>
  <div>
    <PanelRun />
    <TableLogs class="mt-5" />
  </div>
</template>

<script>
import { PanelRun } from '__cli/modules/jobs';
import { TableLogs } from '__cli/modules/logger';
export default {
  name: 'PageHome',
  components: { TableLogs, PanelRun }
};
</script>
