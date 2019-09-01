import { checkJob } from './jobs-error';
import { jobTypes } from './jobs-type';

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

  if (!checkJob(job, snapshot)) {
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
    return `${bucketPath}/${pathStr(job, snapshot)}`;
  } else if (snapshot.getParent(job)) {
    const parent = snapshot.getParent(job);
    return `${jobPath(parent, path, snapshot)}/${pathStr(job, snapshot)}`;
  } else {
    return '';
  }
}

function pathStr(job, snapshot) {
  const t = (snapshot.isAlive(job) ? '▶️' : '📦') + job.title;

  const pos = t.indexOf(' ');
  const dot = '..';
  return pos == -1 || t.length < pos + dot.length
    ? t
    : t.substring(0, pos) + dot;
}
