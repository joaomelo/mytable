import { log } from '@/log';
import { select } from './base';
import { checkJob } from './jobs-error';

export { createSnapshot };

async function createSnapshot() {
  log('starting caching process');

  const tables = await Promise.all([
    select('buckets', ['title']),
    select('jobs', [
      'title',
      'ntype',
      'active',
      'status',
      'parent_b',
      'parent_j',
      'path',
      'rtype',
      'frequency',
      'month',
      'quarter',
      'year',
      'error'
    ]),
    select('transactions', ['title', 'job', 'date', 'value', 'error'])
  ]);

  log('caching complete');

  return new Snapshot(tables[0], tables[1], tables[2]);
}

class Snapshot {
  constructor(buckets, jobs, transactions) {
    this.buckets = buckets;
    this.jobs = jobs;
    this.transactions = transactions;
  }

  getTitle(id) {
    const allItems = this.buckets.concat(this.jobs).concat(this.transactions);
    return allItems.find(item => item.id === id);
  }

  getRootJobs() {
    return this.jobs.filter(j => j.parent_b && j.parent_b.length > 0);
  }

  isRoot(job) {
    const rootIds = this.getRootJobs().map(r => r.id);
    return rootIds.includes(job.id);
  }

  getLeafJobs() {
    return this.jobs.filter(j => this.getChildJobs(j).length == 0);
  }

  isLeaf(job) {
    const leafIds = this.getLeafJobs().map(l => l.id);
    return leafIds.includes(job.id);
  }

  getChildJobs(parent) {
    return this.jobs.filter(
      j => hasId(j.parent_b, parent.id) || hasId(j.parent_j, parent.id)
    );
  }

  getParent(job) {
    const parentId = hasElements(job.parent_b)
      ? job.parent_b[0]
      : job.parent_j[0];
    const allParents = this.jobs.concat(this.buckets);

    return allParents.find(item => item.id === parentId);
  }

  getAscendency(job) {
    const ascendency = [];

    let parent = this.getParent(job);
    while (parent && !this.buckets.includes(parent)) {
      ascendency.push(parent);
      parent = this.getParent(parent);
    }

    return ascendency;
  }

  hasRecurringAscendency(job) {
    const ascendency = this.getAscendency(job);
    let hasRecurring = false;
    ascendency.forEach(a => {
      hasRecurring = hasRecurring || a.frequency;
    });
    return hasRecurring;
  }

  getTransactions(job, includeChildren = false) {
    let transactions = this.transactions.filter(t => t.job[0] === job.id);

    if (includeChildren && !checkJob(job, this)) {
      const childrenJobs = this.getChildJobs(job);
      if (hasElements(childrenJobs)) {
        childrenJobs.forEach(childJob => {
          transactions = transactions.concat(
            this.getTransactions(childJob, true)
          );
        });
      }
    }

    return transactions;
  }
}

//utility functions
function hasId(array, id) {
  return array && array.includes(id);
}

function hasElements(array) {
  return array && array.length > 0;
}
