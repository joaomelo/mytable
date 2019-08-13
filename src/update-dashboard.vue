<template>
  <div>
    <div class="mb-3 d-flex justify-content-center">
      <button class="btn btn-primary" @click="update">update</button>
      <button class="btn btn-secondary ml-3" @click="clear">clear</button>
    </div>
    <div v-if="messages.length">
      <ul v-for="message in messages" :key="message.key" class="list-group">
        <li class="list-group-item">
          <small>{{ message.when }}:</small>
          {{ message.text }}
        </li>
      </ul>
    </div>
    <div v-else class="text-center">
      press to update...
    </div>
  </div>
</template>

<script>
import updateMyAirtable from "./myairtable";
import migrateEntregas from "./migrateentregas";

export default {
  name: "UpdateDashboard",
  computed: {
    messages() {
      return this.$store.state.messages.reverse();
    }
  },
  methods: {
    update() {
      const that = this;
      const log = function(text) {
        that.$store.commit("addMessage", text);
      };
      updateMyAirtable(log);
    },
    clear() {
      this.$store.commit("clear");
    }
  }
};
</script>