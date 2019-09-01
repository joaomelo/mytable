import { checkJob } from './jobs-error';
import { createRecurringTypeEntry } from './jobs-type-recurring';
import { createNodeTypeEntry } from './jobs-type-node';
import { createActiveTypeEntry } from './jobs-type-active';

export { createJobsTypeUpdates };

function createJobsTypeUpdates(snapshot) {
  const updates = [];
  snapshot.jobs.forEach(j => {
    if (!checkJob(j, snapshot)) {
      const update = createJobTypeUpdate(j, snapshot);
      update && updates.push(update);
    }
  });
  return updates;
}

function createJobTypeUpdate(job, snapshot) {
  let update;

  const newEntries = {
    ...createRecurringTypeEntry(job, snapshot),
    ...createNodeTypeEntry(job, snapshot),
    ...createActiveTypeEntry(job, snapshot)
  };

  if (Object.keys(newEntries).length > 0) {
    update = {
      table: 'jobs',
      tag: job.title,
      id: job.id,
      newEntries: newEntries
    };
  }

  return update;
}
