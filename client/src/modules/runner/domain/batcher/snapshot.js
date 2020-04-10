import { log } from '__cli/modules/runner/batcher/__cli/log';
import { select } from './base';
import { calcJobError } from '__cli/modules/runner/batcher/__cli/airtable/error';

export { createSnapshot };

async function createSnapshot () {
  log('starting caching process');

  const tables = await Promise.all([
    select('jobs', [
      'title',
      'cycle',
      'path',
      'level',
      'status',
      'liveness',
      'parent',
      'recurrence',
      'frequency',
      'interval',
      'starting',
      'byday',
      'bymonth',
      'start',
      'end',
      'month',
      'quarter',
      'year',
      'error',
      'test'
    ]),
    select('transactions', ['title', 'job', 'date', 'value', 'error'])
  ]);

  await log('caching complete');

  return new Snapshot(tables[0], tables[1]);
}

class Snapshot {
  constructor (jobs, transactions) {
    this.jobs = jobs;
    this.transactions = transactions;
  }

  listTables () {
    return {
      jobs: this.jobs,
      transactions: this.transactions
    };
  }

  getJob (id) {
    return this.jobs.find(job => job.id === id);
  }

  getGoodJobs () {
    return this.jobs.filter(job => !calcJobError(job, this));
  }

  getRootJobs () {
    return this.getGoodJobs().filter(job => this.isRoot(job));
  }

  isRoot (job) {
    return !job.parent;
  }

  getLeafJobs () {
    return this.getGoodJobs().filter(job => this.isLeaf(job));
  }

  isLeaf (job) {
    return this.getChildJobs(job).length === 0;
  }

  getChildJobs (parent) {
    return this.getGoodJobs().filter(
      job => job.parent && job.parent[0] === parent.id
    );
  }

  getParent (job) {
    // cannot use getGoodJobs for circular reference problem with error funcionts
    return job.parent
      ? this.jobs.find(p => p.id === job.parent[0] && p.id !== job.id)
      : undefined;
  }

  getAscendency (job) {
    const ascendency = [];

    let ascendent = this.getParent(job);
    while (ascendent) {
      ascendency.push(ascendent);
      ascendent = this.getParent(ascendent);
    }

    return ascendency;
  }

  getTransactions (job, includeChildren = false) {
    let transactions = this.transactions.filter(
      t => t.job && t.job[0] === job.id
    );

    if (includeChildren) {
      const childrenJobs = this.getChildJobs(job);
      if (childrenJobs && childrenJobs.length > 0) {
        childrenJobs.forEach(childJob => {
          transactions = transactions.concat(
            this.getTransactions(childJob, includeChildren)
          );
        });
      }
    }

    return transactions;
  }
}
