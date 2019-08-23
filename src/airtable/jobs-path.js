import { checkJob } from './error';

export default function(snapshot) {
  const updates = [];
  snapshot.jobs.forEach(j => {
    const update = getJobPathUpdate(j, snapshot);
    update && updates.push(update);
  });

  return updates;
}

function getJobPathUpdate(job, snapshot) {
  let update;

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
    const bucket = snapshot.parentBucket(job);
    return `${bucket.title}/${job.title}`;
  } else if (snapshot.parentJob(job)) {
    const parent = snapshot.parentJob(job);
    return `${jobPath(parent, path, snapshot)}/${job.title}`;
  } else {
    return '';
  }
}
