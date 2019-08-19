import { checkJob } from './error';

export default function(jobs, snapshot) {
  const updates = [];
  jobs.forEach(j => {
    const update = getJobPathUpdate(j, snapshot);
    update && updates.push(update);
  });

  return updates;
}

function getJobPathUpdate(job, snapshot) {
  let update = undefined;

  if (!checkJob(job)) {
    const newPath = jobPath(job, '', snapshot);
    if (!job.path || job.path !== newPath) {
      update = { table: 'jobs', id: job.id, newEntries: { path: newPath } };
    }
  }

  return update;
}

function jobPath(job, path, snapshot) {
  if (job.parent_b) {
    const bucket = snapshot.parentBucketOf(job);
    return `${bucket.title}/${job.title}`;
  } else if (job.parent_j) {
    const parent = snapshot.parentJobOf(job);
    return `${jobPath(parent, path, snapshot)}/${job.title}`;
  }
}
