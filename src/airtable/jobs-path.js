import { checkJob } from './jobs-error';
import { activeTypes as types } from './jobs-type-active';
import { calcFreshActiveType } from './jobs-type-active';

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
    return `${bucketPath}/${pathStr(job)}`;
  } else if (snapshot.getParent(job)) {
    const parent = snapshot.getParent(job);
    return `${jobPath(parent, path, snapshot)}/${pathStr(job)}`;
  } else {
    return '';
  }
}

function pathStr(job) {
  const full = calcFreshActiveType(job) + job.title;

  const firstPos = full.indexOf(' ');
  const secondPos = firstPos == -1 ? firstPos : full.indexOf(' ', firstPos + 1);

  const dot = '..';
  return secondPos == -1 || full.length < secondPos + dot.length
    ? full
    : full.substring(0, secondPos) + dot;
}
