<template>
  <div>
    <v-card
      v-if="logs.length <= 0"
    >
      <v-card-title class="justify-center">
        Run or Create new Jobs
      </v-card-title>
    </v-card>
    <v-card
      v-for="log in logs"
      :key="log.id"
      class="mb-1"
    >
      <v-card-title>{{ log.msg }}</v-card-title>
      <v-card-subtitle>{{ log.when }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { subscribe } from '../domain';
export default {
  name: 'ListLogs',
  data () {
    return {
      logs: []
    };
  },
  mounted () {
    subscribe(newLogs => { this.logs = newLogs.slice(0, 10); });
  }
};
</script>
