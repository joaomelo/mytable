import { calcJobRecurrence } from './recurrence';

export {
  jobRecurrences,
  isFlat,
  createChildrenUniqueDistinctTitles,
  convertToDistinctTitle,
  hasRecurringAscendency
};

const jobRecurrences = {
  ephemeral: '🧿',
  process: '⚙️',
  task: '👩‍🏭',
  flat: '⏱️',
  copy: '📃'
};

function createChildrenUniqueDistinctTitles(job, snapshot) {
  const distinctTitles = snapshot
    .getChildJobs(job)
    .map(child => convertToDistinctTitle(child.title).trim());
  const uniqueTitles = Array.from(new Set(distinctTitles));

  return uniqueTitles;
}

function convertToDistinctTitle(title) {
  const pos = title.indexOf('*');
  return pos == -1 ? title : title.substring(0, pos);
}

function hasRecurringAscendency(job, snapshot) {
  if (!snapshot) console.log('hasRecurringAscendency', job, snapshot);

  const ascendency = snapshot.getAscendency(job);
  let hasRecurring = false;
  ascendency.forEach(a => {
    hasRecurring = hasRecurring || a.frequency;
  });
  return hasRecurring;
}

function isFlat(job, snapshot) {
  return calcJobRecurrence(job, snapshot) === jobRecurrences.flat;
}
