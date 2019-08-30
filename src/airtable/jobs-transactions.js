import moment from 'moment';
import { checkJob } from './jobs-error';
export { createJobsTransactionsUpdates };

function createJobsTransactionsUpdates(snapshot) {
  const updates = [];
  snapshot.jobs.forEach(j => {
    const update = createJobTransactionsUpdates(j, snapshot);
    update && updates.push(update);
  });
  return updates;
}

function createJobTransactionsUpdates(job, snapshot) {
  let update;

  const transactions = snapshot.getTransactions(job, true);
  if (!checkJob(job) && transactions && transactions.length > 0) {
    const newEntries = calcAcc(transactions);

    Object.keys(newEntries).forEach(k => {
      if (newEntries[k] == job[k]) {
        delete newEntries[k];
      }
    });

    if (Object.keys(newEntries).length > 0) {
      update = {
        table: 'jobs',
        id: job.id,
        newEntries: newEntries
      };
    }
  }
  return update;
}

function calcAcc(transactions) {
  const today = moment().endOf('day');

  const subtract = key =>
    moment()
      .startOf('day')
      .subtract(1, key);
  const monthAgo = subtract('months');
  const quarterAgo = subtract('quarters');
  const yearAgo = subtract('years');

  const acc = {
    month: 0,
    quarter: 0,
    year: 0
  };

  transactions.forEach(t => {
    if (moment(t.date).isSameOrBefore(today)) {
      if (moment(t.date).isSameOrAfter(yearAgo)) {
        acc.year += t.value / 12;
        if (moment(t.date).isSameOrAfter(quarterAgo)) {
          acc.quarter += t.value / 3;
          if (moment(t.date).isSameOrAfter(monthAgo)) {
            acc.month += t.value;
          }
        }
      }
    }
  });

  Object.keys(acc).forEach(k => (acc[k] = acc[k].toFixed(2)));
  return acc;
}
