<template>
  <div>
    <h1>I'm Home</h1>
    <TableLogs />
  </div>
</template>

<script>
import { TableLogs } from '__cli/modules/logs';
export default {
  name: 'PageHome',
  components: { TableLogs }
};
</script>
