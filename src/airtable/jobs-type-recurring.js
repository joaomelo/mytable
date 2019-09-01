export { recurringTypes, calcFreshRecurringType, createRecurringTypeEntry };

const recurringTypes = {
  ephemeral: '🔥',
  generator: '⚙️',
  instance: '👩‍🏭'
};

function calcFreshRecurringType(job, snapshot) {
  let type;
  if (job.recurring) {
    type = recurringTypes.generator;
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
