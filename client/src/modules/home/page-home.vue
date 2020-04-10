<template>
  <div>
    <PanelRun />
    <TableLogs class="mt-5" />
  </div>
</template>

<script>
import { PanelRun } from '__cli/modules/runner';
import { TableLogs } from '__cli/modules/logs';
export default {
  name: 'PageHome',
  components: { TableLogs, PanelRun }
};
</script>
