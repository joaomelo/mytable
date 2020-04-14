<template>
  <div>
    <div>
      Jobs
      <v-btn
        :to="{ name: 'job', params: { id: 'add' } }"
      >
        Add
      </v-btn>
    </div>
    <p v-if="jobs.length===0">
      Click Add Button for New Jobs
    </p>
    <v-card
      v-for="job in jobs"
      v-else
      :key="job.id"
    >
      <v-card-text>
        <p>Base: {{ job.baseId }}</p>
        <p>Table: {{ job.tableName }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn :to="{ name: 'job', params: { id: job.id } }">
          Edit
        </v-btn>
        <v-btn @click="del(job.id)">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getJobsCollection } from '../domain';

export default {
  name: 'PageJobs',
  data () {
    return {
      jobsCollection: getJobsCollection(),
      subscription: undefined,
      jobs: []
    };
  },
  mounted () {
    this.subscription = this.jobsCollection.subscribe(items => { this.jobs = items; });
  },
  unmounted () {
    this.subscription();
  },
  methods: {
    del (id) {
      this.jobsCollection.del(id);
    }
  }
};
</script>
