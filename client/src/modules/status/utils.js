import { calcJobLiveness } from './liveness';

const jobLiveness = {
  resting: '😴',
  active: '😃',
  dead: '💀'
};

function isAlive (job) {
  return calcJobLiveness(job) !== jobLiveness.dead;
}

function isActive (job) {
  return calcJobLiveness(job) === jobLiveness.active;
}

function hasAliveChildren (job, snapshot) {
  const aliveChildren = snapshot
    .getChildJobs(job)
    .filter(child => isAlive(child));
  return aliveChildren.length > 0;
}

export { jobLiveness, hasAliveChildren, isAlive, isActive };
