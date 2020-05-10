<template>
  <FormJob
    v-if="isReady"
    :original-job="job"
    @save="edit"
    @cancel="cancel"
  />
</template>

<script>
import { loader } from '__cli/core/loader';
import { jobsCollectionUpdateSignal } from '../domain';
import FormJob from './form-job';

export default {
  name: 'PageEditJob',
  components: { FormJob },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      jobsCollection: null,
      unsubscribe: null,
      job: null
    };
  },
  computed: {
    isReady () {
      return this.jobsCollection && this.job;
    }
  },
  mounted () {
    const unsub = jobsCollectionUpdateSignal.subscribe(jobsCollection => {
      this.jobsCollection = jobsCollection;
      if (jobsCollection) {
        this.job = jobsCollection.getItem(this.id);
      }
    });
    this.unsubscribe = unsub;
  },
  unmounted () {
    this.unsubscribe();
  },
  methods: {
    edit (job) {
      loader.run(this.jobsCollection.set(job));
      this.$router.go(-1);
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
