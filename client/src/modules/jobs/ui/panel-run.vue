<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      :disabled="isTimerOn"
      @click="update"
    >
      Run
    </v-btn>
    <v-spacer />
    <CountdownTimer
      ref="timer"
      class="ml-5"
      @timer="update"
      @started="isTimerOn = true"
      @stopped="isTimerOn = false"
    />
  </div>
</template>

<script>
import { loader } from '__cli/core/loader';
import { CountdownTimer } from '__cli/core/base';
import { runAllJobs } from '../domain';

export default {
  name: 'PanelRun',
  components: { CountdownTimer },
  data () {
    return {
      isTimerOn: false
    };
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
