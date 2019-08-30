<template>
  <div class="mb-5">
    <div class="mb-3 d-flex justify-content-center">
      <button class="btn btn-primary" @click="update" :disabled="disabled">
        update
      </button>
      <button
        class="btn btn-secondary ml-3"
        @click="logout"
        :disabled="disabled"
      >
        logout
      </button>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <Loader v-if="disabled" />
      <div v-else>press to update</div>
    </div>
    <div v-if="logs.length > 0">
      <ul v-for="log in logs" :key="log.id" class="list-group list-group-flush">
        <li class="list-group-item text-monospace px-1 py-0">
          <small>{{ log.when }}:</small>
          {{ log.msg }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from "@/loader";
import router from "@/router";
import { log } from "@/log";
import { startAirtable, updateAirtable } from "@/airtable";

export default {
  name: "Dashboard",
  components: { Loader },
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    logs() {
      return this.$store.state.logs;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      router.push("/login");
    },
    update() {
      this.disabled = true;
      updateAirtable()
        .then(result => {
          log(result);
          this.disabled = false;
        })
        .catch(err => {
          log(err);
          this.disabled = false;
        });
    }
  },
  created() {
    startAirtable();
    this.$store.dispatch("setLogs");
  }
};
</script>
