<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      @click="update"
    >
      Run
    </v-btn>
  </div>
</template>

<script>
import { runAllJobs } from '../domain';

export default {
  name: 'PanelRun',
  methods: {
    update () {
      runAllJobs();
    }
  }
};
</script>
