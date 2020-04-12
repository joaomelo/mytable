import { jobLiveness } from './utils';

export { createJobLivenessCommand, calcJobLiveness };

function createJobLivenessCommand (job) {
  let command;

  const liveness = calcJobLiveness(job);
  if (liveness !== job.liveness) {
    command = {
      type: 'update',
      collection: 'jobs',
      id: job.id,
      tag: job.title,
      entries: {
        liveness: liveness
      }
    };
  }

  return command;
}

function calcJobLiveness (job) {
  let liveness;

  if (['done', 'cancelled'].includes(job.status)) {
    liveness = jobLiveness.dead;
  } else {
    liveness = ['delegated', 'automatic', 'blocked', 'idea'].includes(
      job.status
    )
      ? jobLiveness.resting
      : jobLiveness.active;
  }

  return liveness;
}
