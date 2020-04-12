<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      :loading="status === 'updating'"
      @click="update"
    >
      Run
    </v-btn>
  </div>
</template>

<script>
import { logThis } from '__cli/modules/logger';
import { runAllJobs } from '../domain';

export default {
  name: 'PanelRun',
  data () {
    return {
      status: 'idle'
    };
  },
  methods: {
    update () {
      this.status = 'updating';
      runAllJobs()
        .then(() => {
          logThis('run complete');
          this.status = 'idle';
        })
        .catch(e => {
          logThis(`${e.name}: ${e.message}`);
          console.error(e);
          this.status = 'idle';
        });
    }
  }
};
</script>
