import at from './airtable';
import log from './log';
import { checkJob } from './error';

export default async function() {
  const snapshot = {
    data: {
      buckets: [],
      jobs: []
    },

    get allJobs() {
      return this.data.jobs;
    },

    get rootJobs() {
      return this.data.jobs.filter(
        j => !checkJob(j) && (j.parent_b && j.parent_b.length > 0)
      );
    },

    childrenJobsOf(parent) {
      return this.data.jobs.filter(
        j =>
          !checkJob(j) &&
          ((j.parent_b && j.parent_b.includes(parent.id)) ||
            (j.parent_j && j.parent_j.includes(parent.id)))
      );
    },

    parentJobOf(job) {
      return this.data.jobs.find(
        j => !checkJob(j) && job.parent_j && j.id === job.parent_j[0]
      );
    },

    parentBucketOf(job) {
      return this.data.buckets.find(
        b =>
          !checkJob(job) &&
          job.parent_b &&
          job.parent_b.length > 0 &&
          b.id === job.parent_b[0]
      );
    },

    titleOf(id) {
      const job = this.data.jobs.find(j => j.id === id);
      return job.title;
    }
  };

  const data = await load(snapshot);
  snapshot.data.buckets = data[0];
  snapshot.data.jobs = data[1];
  return snapshot;
}

async function load(snapshot) {
  return await Promise.all([
    tableData('buckets', ['title']),
    tableData('jobs', ['title', 'parent_b', 'parent_j', 'path', 'error'])
  ]);
}

async function tableData(table, fields) {
  const cache = await at.select(table, fields);
  await log(`cached ${cache.length} records from ${table}`);
  return cache;
}
