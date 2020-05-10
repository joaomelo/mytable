<template>
  <div>
    <v-card
      v-if="logs.length <= 0"
    >
      <v-card-title class="justify-center">
        Run or Create new Jobs
      </v-card-title>
    </v-card>
    <div
      v-else
    >
      <div class="d-flex justify-end">
        <v-btn
          x-small
          color="secondary"
          @click="exportLogs"
        >
          Download logs
        </v-btn>
      </div>
      <v-card
        v-for="log in logs"
        :key="log.id"
        class="mt-1"
      >
        <v-card-title>{{ log.msg }}</v-card-title>
        <v-card-subtitle>{{ log.prettyWhen }}</v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script>
import { loader } from '__cli/core/loader';
import { logsStore, convertLogsToFile } from '../domain';
export default {
  name: 'ListLogs',
  computed: {
    logs () {
      return logsStore.logs;
    }
  },
  methods: {
    exportLogs () {
      loader.start();
      const content = convertLogsToFile();
      const encodedUri = encodeURI(content);
      loader.stop();
      window.open(encodedUri);
    }
  }
};
</script>
