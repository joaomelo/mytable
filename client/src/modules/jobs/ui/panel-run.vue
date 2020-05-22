<template>
  <div>
    <div class="d-flex justify-center">
      <v-btn
        color="primary"
        :disabled="isTimerOn || !hasJob || !!error"
        @click="update"
      >
        Run
      </v-btn>
      <v-spacer />
      <CountdownTimer
        ref="timer"
        class="ml-5"
        :disabled="!hasJob || !!error"
        @timer="update"
        @started="isTimerOn = true"
        @stopped="isTimerOn = false"
      />
    </div>
    <v-alert
      v-if="error"
      type="error"
      class="mt-1"
    >
      {{ error }}
    </v-alert>
  </div>
</template>

<script>
import { loader } from '__cli/core/loader';
import { CountdownTimer } from '__cli/core/base';
import { runAllJobs, jobsStore } from '../domain';

export default {
  name: 'PanelRun',
  components: { CountdownTimer },
  data () {
    return {
      error: null,
      isTimerOn: false
    };
  },
  computed: {
    hasJob () {
      return (jobsStore.job && jobsStore.job.table);
    }
  },
  methods: {
    update () {
      if (loader.status === 'IDLE') {
        runAllJobs().then(() => this.isTimerOn && this.$refs.timer.start());
      }
    }
  }
};
</script>
