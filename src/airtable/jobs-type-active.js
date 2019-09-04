export { activeTypes, calcFreshActiveType, isActive, createActiveTypeEntry };

const activeTypes = {
  resting: '😴',
  alive: '😃',
  dead: '💀'
};

function calcFreshActiveType(job) {
  let type;
  if (['done', 'cancelled'].includes(job.status)) {
    type = activeTypes.dead;
  } else {
    type = ['delegated', 'automatic', 'blocked', 'idea'].includes(job.status)
      ? activeTypes.resting
      : activeTypes.alive;
  }

  return type;
}

function createActiveTypeEntry(job) {
  const newType = calcFreshActiveType(job);
  return newType !== job.active ? { active: newType } : undefined;
}

function isActive(job) {
  return calcFreshActiveType(job) != activeTypes.dead;
}
