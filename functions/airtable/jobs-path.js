import tables from './tables';
import { checkJob } from './error';
import cache from './cache';
import batcher from './batcher';

export default function() {
  const jobs = cache.allJobs;
  jobs.forEach(j => {
    if (!checkJob(j)) {
      feedJobPath(j);
    }
  });
}

function feedJobPath(job) {
  const newPath = jobPath(job, '', cache);
  if (!job.path || job.path !== newPath) {
    batcher.push(tables.jobs, job.id, { path: newPath });
  }
}

function jobPath(job, path) {
  if (job.parent_b) {
    const bucket = cache.parentBucketOf(job);
    return `${bucket.title}/${job.title}`;
  } else if (job.parent_j) {
    const parent = cache.parentJobOf(job);
    return `${jobPath(parent, path)}/${job.title}`;
  }
}
