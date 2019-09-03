export { activeTypes, calcFreshActiveType, createActiveTypeEntry };

const activeTypes = {
  resting: '😴',
  alive: '😃',
  dead: '💀'
};

function calcFreshActiveType(job) {
  let type;
  if (['done', 'cancelled'].includes(job.status)) {
    type = activeTypes.dead;
  } else if (
    ['delegated', 'automatic', 'blocked', 'idea'].includes(job.status)
  ) {
    type = activeTypes.resting;
  } else {
    type = activeTypes.alive;
  }

  return type;
}

function createActiveTypeEntry(job) {
  const newType = calcFreshActiveType(job);
  return newType !== job.active ? { active: newType } : undefined;
}
