<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      @click="update"
    >
      Run
    </v-btn>
  </div>
</template>

<script>
import { logThis } from '__cli/modules/logs';
import { updateAirtable } from '../domain';

export default {
  name: 'PanelRun',
  data () {
    return {
      status: 'idle'
    };
  },
  methods: {
    update () {
      this.status = 'updating';
      updateAirtable()
        .then(result => {
          logThis(result);
          this.status = 'idle';
        })
        .catch(e => {
          logThis(`${e.name}: ${e.message}`);
          console.error(`${e.name}: ${e.message}`);
          this.status = 'idle';
        });
    }
  }
};
</script>
