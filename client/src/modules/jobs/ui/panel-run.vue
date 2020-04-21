<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      :loading="jobRunner.status === 'updating'"
      @click="update"
    >
      Run
    </v-btn>
  </div>
</template>

<script>
import { jobRunner } from '../domain';

export default {
  name: 'PanelRun',
  data () {
    return {
      jobRunner
    };
  },
  methods: {
    update () {
      this.jobRunner.runAllJobs();
    }
  }
};
</script>
