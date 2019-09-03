export { recurringTypes, calcFreshRecurringType, createRecurringTypeEntry };

const recurringTypes = {
  ephemeral: '🔥',
  process: '⚙️',
  flat: '⏱️',
  instance: '👩‍🏭'
};

function calcFreshRecurringType(job, snapshot) {
  let type;
  if (job.frequency) {
    const titles = createChildrenUniqueDistinctTitles(job, snapshot);
    type = titles.length <= 1 ? recurringTypes.flat : recurringTypes.process;
  } else if (snapshot.hasRecurringAscendency(job)) {
    type = recurringTypes.instance;
  } else {
    type = recurringTypes.ephemeral;
  }
  return type;
}

function createRecurringTypeEntry(job, snapshot) {
  const newType = calcFreshRecurringType(job, snapshot);
  return newType !== job.rtype ? { rtype: newType } : undefined;
}

function createChildrenUniqueDistinctTitles(job, snapshot) {
  const distinctTitles = snapshot
    .getChildJobs(job)
    .map(child => convertToDistinct(child.title).trim());
  const uniqueTitles = Array.from(new Set(distinctTitles));

  return uniqueTitles;
}

function convertToDistinct(title) {
  const pos = title.indexOf('#');
  return pos == -1 ? title : title.substring(0, pos);
}
