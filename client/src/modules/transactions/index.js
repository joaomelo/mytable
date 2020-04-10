import moment from '__cli/modules/transactions/__cli/modules/runner/transactions/moment';
import { calcJobError } from '../error';

export { createJobTransactionsCommand };

function createJobTransactionsCommand (job, snapshot) {
  let command;

  if (!calcJobError(job, snapshot)) {
    const entries = calcAverageAcc(job, snapshot);

    Object.keys(entries).forEach(k => {
      const original = job[k] === undefined ? '' : job[k];
      const calculated = entries[k] === 0 ? '' : entries[k].toFixed(2);

      if (calculated === original) {
        delete entries[k];
      } else {
        entries[k] = calculated;
      }
    });

    if (Object.keys(entries).length > 0) {
      command = {
        type: 'update',
        table: 'jobs',
        id: job.id,
        tag: job.title,
        entries: entries
      };
    }
  }

  return command;
}

function calcAverageAcc (job, snapshot) {
  const avg = {
    month: 0,
    quarter: 0,
    year: 0
  };

  const transactions = snapshot.getTransactions(job, true);
  if (transactions && transactions.length > 0) {
    const today = moment().endOf('day');

    const subtract = date =>
      moment()
        .startOf('day')
        .subtract(1, date);
    const monthAgo = subtract('months');
    const quarterAgo = subtract('quarters');
    const yearAgo = subtract('years');

    transactions.forEach(t => {
      if (moment(t.date).isSameOrBefore(today)) {
        if (moment(t.date).isSameOrAfter(yearAgo)) {
          avg.year += t.value / 12;
          if (moment(t.date).isSameOrAfter(quarterAgo)) {
            avg.quarter += t.value / 3;
            if (moment(t.date).isSameOrAfter(monthAgo)) {
              avg.month += t.value;
            }
          }
        }
      }
    });
  }
  return avg;
}
