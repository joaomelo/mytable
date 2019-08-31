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
      update = {
        table: 'jobs',
        id: job.id,
        tag: job.title,
        newEntries: { path: newPath }
      };
    }
  }

  return update;
}

function jobPath(job, path, snapshot) {
  if (job.parent_b) {
    const bucketPath = snapshot.getParent(job).title.substring(0, 1);
    return `${bucketPath}/${pathStr(job)}`;
  } else if (snapshot.getParent(job)) {
    const parent = snapshot.getParent(job);
    return `${jobPath(parent, path, snapshot)}/${pathStr(job)}`;
  } else {
    return '';
  }
}

function pathStr(job) {
  const act = '▶️';
  const ina = '📦';
  const prefixlength = 7;
  const posfix = '..';
  let result = job.title;

  if (result.length > prefixlength + posfix.length) {
    result = result.substring(0, prefixlength) + posfix;
  }
  result = job.active ? act + result : ina + result;

  return result;
}
