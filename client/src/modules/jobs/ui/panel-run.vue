<template>
  <div>
    <div class="d-flex justify-center">
      <v-btn
        color="primary"
        :disabled="isTimerOn || !hasJobs || !!error"
        @click="update"
      >
        Run
      </v-btn>
      <v-spacer />
      <CountdownTimer
        ref="timer"
        class="ml-5"
        :disabled="!hasJobs || !!error"
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
import { runAllJobs, jobsCollectionUpdateSignal } from '../domain';

export default {
  name: 'PanelRun',
  components: { CountdownTimer },
  data () {
    return {
      error: null,
      isTimerOn: false,
      hasJobs: false
    };
  },
  mounted () {
    window.addEventListener('offline', () => {
      this.error = 'no connection detected';
    });
    window.addEventListener('online', () => {
      if (this.error === 'no connection detected') {
        this.error = null;
      }
    });

    const unsub = jobsCollectionUpdateSignal.subscribe(jobsCollection => {
      this.jobsCollection = jobsCollection;
      if (jobsCollection) {
        jobsCollection.subscribe(jobs => { this.hasJobs = jobs.length > 0; });
      }
    });
    this.unsubscribe = unsub;
  },
  unmounted () {
    this.unsubscribe();
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
