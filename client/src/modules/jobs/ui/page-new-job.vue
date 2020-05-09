<template>
  <div>
    <v-alert
      v-if="isReady"
      type="warning"
    >
      Conditions to add a new job not met
    </v-alert>
    <FormJob
      v-else
      @save="add"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { loader } from '__cli/core/loader';
import { jobsCollectionUpdateSignal } from '../domain';
import FormJob from './form-job';

export default {
  name: 'PageNewJob',
  components: { FormJob },
  data () {
    return {
      jobsCollection: null,
      unsubscribe: null
    };
  },
  computed: {
    isReady () {
      console.log(!!this.jobsCollection);
      return !!this.jobsCollection;
    }
  },
  mounted () {
    const unsub = jobsCollectionUpdateSignal.subscribe(jobsCollection => {
      console.log(jobsCollection);
      this.jobsCollection = jobsCollection;
    });
    this.unsubscribe = unsub;
  },
  unmounted () {
    this.unsubscribe();
  },
  methods: {
    add (job) {
      loader.run(this.jobsCollection.add(this.job));
      this.$router.go(-1);
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
