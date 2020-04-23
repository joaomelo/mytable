<template>
  <div class="d-flex justify-center align-center">
    <span
      class="title"
    >{{ prettyRemaining }}</span>
    <v-btn
      icon
      @click="start"
    >
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="stop"
    >
      <v-icon>mdi-stop</v-icon>
    </v-btn>
  </div>
</template>

<script>
const ONE_MINUTE_IN_SECONDS = 5 * 60;

export default {
  name: 'CountdownTimer',
  props: {
    cycle: {
      type: Number,
      default: ONE_MINUTE_IN_SECONDS
    }
  },
  data () {
    return {
      remainning: this.cycle,
      currentInterval: undefined
    };
  },
  computed: {
    prettyRemaining () {
      if (!this.remainning || this.remainning <= 0) {
        return '00:00';
      }

      const minutes = Math.floor(this.remainning / 60);
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = this.remainning - (minutes * 60);
      const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const result = `${minutesStr}:${secondsStr}`;

      return result;
    }
  },
  methods: {
    start () {
      this.$emit('started');
      this.currentInterval = setInterval(() => {
        this.remainning--;
        if (this.remainning <= 0) {
          this.reset();
          this.$emit('timer');
        }
      }, 1000);
    },
    stop () {
      this.reset();
      this.$emit('stopped');
    },
    reset () {
      clearInterval(this.currentInterval);
      this.remainning = this.cycle;
    }
  }
};
</script>
