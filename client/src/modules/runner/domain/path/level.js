import { calcJobError } from '__cli/modules/runner/path/__cli/airtable/error';

const jobLevels = {
  root: '🥔',
  branch: '🌿',
  leaf: '🍀'
};

function createJobLevelCommand (job, snapshot) {
  let command;

  if (!calcJobError(job, snapshot)) {
    const level = calcJobLevel(job, snapshot);
    if (job.level !== level) {
      command = {
        type: 'update',
        table: 'jobs',
        id: job.id,
        tag: job.title,
        entries: { level: level }
      };
    }
  }

  return command;
}

function calcJobLevel (job, snapshot) {
  let type;
  if (snapshot.isLeaf(job)) {
    type = jobLevels.leaf;
  } else if (snapshot.isRoot(job)) {
    type = jobLevels.root;
  } else {
    type = jobLevels.branch;
  }
  return type;
}

export { jobLevels, calcJobLevel, createJobLevelCommand };
