export { activeTypes, calcFreshActiveType, createActiveTypeEntry };

const activeTypes = {
  alive: '😃',
  dead: '💀'
};

function calcFreshActiveType(job, snapshot) {
  const type = snapshot.isAlive(job) ? activeTypes.alive : activeTypes.dead;
  return type;
}

function createActiveTypeEntry(job, snapshot) {
  const newType = calcFreshActiveType(job, snapshot);
  return newType !== job.active ? { active: newType } : undefined;
}
