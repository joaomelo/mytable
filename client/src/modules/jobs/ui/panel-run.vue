<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      :disabled="isTimerOn || !hasJobs"
      @click="update"
    >
      Run
    </v-btn>
    <v-spacer />
    <CountdownTimer
      ref="timer"
      class="ml-5"
      :disabled="!hasJobs"
      @timer="update"
      @started="isTimerOn = true"
      @stopped="isTimerOn = false"
    />
  </div>
</template>

<script>
import { loader } from '__cli/core/loader';
import { CountdownTimer } from '__cli/core/base';
import { runAllJobs, jobsCollection } from '../domain';

export default {
  name: 'PanelRun',
  components: { CountdownTimer },
  data () {
    return {
      isTimerOn: false,
      hasJobs: false
    };
  },
  mounted () {
    jobsCollection && jobsCollection.subscribe(jobs => {
      this.hasJobs = jobs.length > 0;
    });
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
