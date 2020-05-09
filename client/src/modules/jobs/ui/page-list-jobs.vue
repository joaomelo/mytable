<template>
  <div>
    <div class="d-flex align-center mb-1">
      <h1>
        Jobs
      </h1>
      <v-btn
        :to="{ name: 'job-new' }"
        class="ml-auto"
        color="info"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add
      </v-btn>
    </div>
    <p v-if="jobs.length===0">
      Click Add Button for New Jobs
    </p>
    <v-card
      v-for="job in jobs"
      :key="job.id"
      class="mt-1"
    >
      <v-card-title><strong>Table:&nbsp;</strong> {{ job.tableName }}</v-card-title>
      <v-card-subtitle><strong>Base:&nbsp;</strong> {{ job.baseId }}</v-card-subtitle>
      <v-divider />
      <v-card-actions>
        <v-btn
          :to="{ name: 'job-edit', params: { id: job.id } }"
          color="warning"
          class="ml-auto"
        >
          <v-icon left>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
        <v-btn
          color="error"
          @click="del(job.id)"
        >
          <v-icon left>
            mdi-delete
          </v-icon>
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { loader } from '__cli/core/loader';
import { jobsCollectionUpdateSignal } from '../domain';

export default {
  name: 'PageListJobs',
  data () {
    return {
      jobsCollection: null,
      jobs: []
    };
  },
  mounted () {
    const unsub = jobsCollectionUpdateSignal.subscribe(jobsCollection => {
      this.jobsCollection = jobsCollection;
      if (jobsCollection) {
        jobsCollection.subscribe(jobs => { this.jobs = jobs; });
      }
    });
    this.unsubscribe = unsub;
  },
  unmounted () {
    this.unsubscribe();
  },
  methods: {
    del (id) {
      loader.run(this.jobsCollection.del(id));
    }
  }
};
</script>
