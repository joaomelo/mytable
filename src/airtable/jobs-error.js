import { jobTypes } from './jobs-type';
export { checkJob, createJobsErrorsUpdates };

function checkJob(job, snapshot) {
  if (job.parent_b && job.parent_j) {
    return 'has both job and bucket parents';
  }

  if (!job.parent_b && !job.parent_j) {
    return 'does not has a parent';
  }

  if (job.parent_j && job.id === job.parent_j[0]) {
    return 'parent is pointing to himself';
  }

  if (!job.title) {
    return 'has no title';
  }

  if (job.recurring && snapshot.hasRecurringAscendency(job)) {
    return 'you can not have a recurring job inside another one';
  }
}

function createJobsErrorsUpdates(snapshot) {
  const updates = [];

  snapshot.jobs.forEach(j => {
    const error = checkJob(j, snapshot);
    const createUpdate = e => ({
      table: 'jobs',
      id: j.id,
      tag: j.title,
      newEntries: { error: e }
    });

    if (error && error != j.error) {
      updates.push(createUpdate(error));
    } else if (!error && j.error) {
      updates.push(createUpdate(''));
    }
  });
  return updates;
}
