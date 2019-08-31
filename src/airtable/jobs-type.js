import { checkJob } from './jobs-error';
export { createJobsTypeUpdates, jobTypes };

function createJobsTypeUpdates(snapshot) {
  const updates = [];
  snapshot.jobs.forEach(j => {
    if (!checkJob(j)) {
      const update = createJobTypeUpdate(j, snapshot);
      update && updates.push(update);
    }
  });
  return updates;
}

const jobTypes = {
  ephemeral: '🔥ephemeral',
  generator: '⚙️generator',
  instance: '👩‍🏭instance',
  leaf: '🍀leaf',
  root: '🌵root',
  alive: '😃alive',
  dead: '🧟dead'
};

function createTypeArray(job, snapshot) {
  const type = [];

  if (job.recurring) {
    type.push(jobTypes.generator);
  } else if (snapshot.getParent(job).recurring) {
    type.push(jobTypes.instance);
  } else {
    type.push(jobTypes.ephemeral);
  }

  if (snapshot.isRoot(job)) {
    type.push(jobTypes.root);
  } else if (snapshot.isLeaf(job)) {
    type.push(jobTypes.leaf);
  }

  if (snapshot.isAlive(job)) {
    type.push(jobTypes.alive);
  } else {
    type.push(jobTypes.dead);
  }

  return type;
}

function createJobTypeUpdate(job, snapshot) {
  let update;
  const newType = createTypeArray(job, snapshot).sort();
  const oldType = job.type ? job.type.sort() : [];

  if (newType.join() !== oldType.join()) {
    update = {
      table: 'jobs',
      tag: job.title,
      id: job.id,
      newEntries: { type: newType }
    };
  }

  return update;
}
