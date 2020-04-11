<template>
  <div
    class="d-flex justify-center"
  >
    <v-btn
      color="primary"
      :loading="status === 'updating'"
      @click="update"
    >
      Run
    </v-btn>
  </div>
</template>

<script>
import { logThis } from '__cli/modules/logs';
// import { updateAirtable } from '../domain';
import { select } from '__cli/modules/airtable'; ;

const updateAirtable = () => {
  const promise = new Promise((resolve, reject) => {
    select('jobs', ['title']).then(v => resolve(v));
  });
  return promise;
};

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
          console.log(result);
          // logThis(result);
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
