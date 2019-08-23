import log from './log';
import { select } from './at';
import { checkJob } from './error';

export { createSnapshot };

async function createSnapshot() {
  const data = await Promise.all([
    tableData('buckets', ['title']),
    tableData('jobs', ['title', 'parent_b', 'parent_j', 'path', 'error']),
    tableData('transactions', ['title', 'job', 'date', 'value', 'error'])
  ]);

  return new Snapshot(data[0], data[1], data[2]);
}

async function tableData(table, fields) {
  const cache = await select(table, fields);
  await log(`cached ${cache.length} records from ${table}`);
  return cache;
}

class Snapshot {
  constructor(buckets, jobs, transactions) {
    this.buckets = buckets;
    this.jobs = jobs;
    this.transactions = transactions;
  }

  rootJobs() {
    return this.jobs.filter(
      j => !checkJob(j) && (j.parent_b && j.parent_b.length > 0)
    );
  }

  leafsJobs() {
    return this.jobs.filter(j => !checkJob(j) && !this.childrenJobs(j));
  }

  childrenJobs(parent) {
    return this.jobs.filter(
      j =>
        !checkJob(j) &&
        ((j.parent_b && j.parent_b.includes(parent.id)) ||
          (j.parent_j && j.parent_j.includes(parent.id)))
    );
  }

  parentJob(job) {
    return this.jobs.find(
      j => !checkJob(j) && job.parent_j && j.id === job.parent_j[0]
    );
  }

  parentBucket(job) {
    return this.buckets.find(
      b =>
        !checkJob(job) &&
        job.parent_b &&
        job.parent_b.length > 0 &&
        b.id === job.parent_b[0]
    );
  }

  titleOf(id) {
    const job = this.jobs.find(j => !checkJob(j) && j.id === id);
    return job.title;
  }
}
