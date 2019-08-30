import { checkJob } from './jobs-error';

export { createJobsPathsUpdates };

function createJobsPathsUpdates(snapshot) {
  const updates = [];
  snapshot.jobs.forEach(j => {
    const update = createJobPathUpdate(j, snapshot);
    update && updates.push(update);
  });

  return updates;
}

function createJobPathUpdate(job, snapshot) {
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
    const bucket = snapshot.getParent(job);
    return `${bucket.title}/${job.title}`;
  } else if (snapshot.getParent(job)) {
    const parent = snapshot.getParent(job);
    return `${jobPath(parent, path, snapshot)}/${job.title}`;
  } else {
    return '';
  }
}
