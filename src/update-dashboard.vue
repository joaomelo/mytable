<template>
  <div>
    <div class="mb-3 d-flex justify-content-center">
      <button class="btn btn-primary" @click="update" :disabled="disabled">
        update
      </button>
      <button
        class="btn btn-secondary ml-3"
        @click="clear"
        :disabled="disabled"
      >
        clear
      </button>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <div class="loader" v-if="disabled">
        updating
        <span class="loader__dot">.</span>
        <span class="loader__dot">.</span>
        <span class="loader__dot">.</span>
      </div>
      <div v-else>
        press to update
      </div>
    </div>
    <div v-if="messages.length">
      <ul v-for="message in messages" :key="message.key" class="list-group">
        <li class="list-group-item">
          <small>{{ message.when }}:</small>
          {{ message.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import updateMyAirtable from "@/airtable";
import log from "./log";

export default {
  name: "UpdateDashboard",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    }
  },
  methods: {
    update() {
      this.disabled = true;
      updateMyAirtable()
        .then(() => {
          this.disabled = false;
        })
        .catch(err => {
          console.log(err);
          log(err);
          this.disabled = false;
        });
    },
    clear() {
      this.$store.commit("clear");
    }
  }
};
</script>

<style scoped>
@keyframes blink {
  50% {
    color: transparent;
  }
}
.loader__dot {
  animation: 1s blink infinite;
}
.loader__dot:nth-child(2) {
  animation-delay: 250ms;
}
.loader__dot:nth-child(3) {
  animation-delay: 500ms;
}
</style>