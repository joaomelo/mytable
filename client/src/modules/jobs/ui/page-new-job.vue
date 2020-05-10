<template>
  <FormJob
    v-if="isReady"
    @save="add"
    @cancel="cancel"
  />
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
      return !!this.jobsCollection;
    }
  },
  mounted () {
    const unsub = jobsCollectionUpdateSignal.subscribe(jobsCollection => {
      this.jobsCollection = jobsCollection;
    });
    this.unsubscribe = unsub;
  },
  unmounted () {
    this.unsubscribe();
  },
  methods: {
    add (job) {
      loader.run(this.jobsCollection.add(job));
      this.$router.go(-1);
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
