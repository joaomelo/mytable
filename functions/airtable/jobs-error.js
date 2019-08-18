import tables from './tables';
import { checkJob } from './error';
import cache from './cache';
import batcher from './batcher';

export default function() {
  const jobs = cache.allJobs;
  jobs.forEach(j => {
    const error = checkJob(j);
    if (error) {
      batcher.push(tables.jobs, j.id, { error: error });
    } else if (j.error) {
      batcher.push(tables.jobs, j.id, { error: '' });
    }
  });
}
