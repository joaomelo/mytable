import tbs from './tables';
import log from '@/log';
import { checkJob } from './error';

export default {
  cachedTbs: {
    buckets: [],
    jobs: []
  },

  get allJobs() {
    return this.cachedTbs.jobs;
  },

  get rootJobs() {
    return this.cachedTbs.jobs.filter(
      j => !checkJob(j) && (j.parent_b && j.parent_b.length > 0)
    );
  },

  childrenJobsOf(parent) {
    return this.cachedTbs.jobs.filter(
      j =>
        !checkJob(j) &&
        ((j.parent_b && j.parent_b.includes(parent.id)) ||
          (j.parent_j && j.parent_j.includes(parent.id)))
    );
  },

  parentJobOf(job) {
    return this.cachedTbs.jobs.find(
      j => !checkJob(j) && job.parent_j && j.id == job.parent_j[0]
    );
  },

  parentBucketOf(job) {
    return this.cachedTbs.buckets.find(
      b =>
        !checkJob(job) &&
        job.parent_b &&
        job.parent_b.length > 0 &&
        b.id == job.parent_b[0]
    );
  },

  titleOf(id) {
    const job = this.cachedTbs.jobs.find(j => j.id == id);
    return job.title;
  },

  clear() {
    Object.keys(this.cachedTbs).forEach(k => (this.cachedTbs[k] = []));
  },

  async reload() {
    this.clear();
    const r = await Promise.all([
      cacheTable(tbs.buckets, ['title']),
      cacheTable(tbs.jobs, ['title', 'parent_b', 'parent_j', 'path', 'error'])
    ]);
    this.cachedTbs.buckets = r[0];
    this.cachedTbs.jobs = r[1];
  }
};

async function cacheTable(table, fieldsToSelect) {
  const cache = [];
  await table
    .select({ fields: fieldsToSelect })
    .eachPage((records, fetchNextPage) => {
      records.forEach(r => {
        const item = {
          id: r.id
        };
        fieldsToSelect.forEach(f => {
          const value = r.get(f);
          if (
            !(Array.isArray(value) && value.length == 0) &&
            !(value == undefined || value == '')
          ) {
            item[f] = value;
          }
        });
        cache.push(item);
      });
      fetchNextPage();
    });

  log(`cached ${cache.length} records from ${table.name}`);
  return cache;
}
