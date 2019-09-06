import moment from 'moment';
import { calcJobError } from '../error';

export { createJobTransactionsCommand };

function createJobTransactionsCommand(job, snapshot) {
  let command;

  if (!calcJobError(job, snapshot)) {
    const transactions = snapshot.getTransactions(job, true);
    if (transactions && transactions.length > 0) {
      const entries = calcAverageAcc(transactions);

      Object.keys(entries).forEach(k => {
        if (entries[k] == job[k]) {
          delete entries[k];
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
  }

  return command;
}

function calcAverageAcc(transactions) {
  const today = moment().endOf('day');

  const subtract = date =>
    moment()
      .startOf('day')
      .subtract(1, date);
  const monthAgo = subtract('months');
  const quarterAgo = subtract('quarters');
  const yearAgo = subtract('years');

  const averageAcc = {
    month: 0,
    quarter: 0,
    year: 0
  };

  transactions.forEach(t => {
    if (moment(t.date).isSameOrBefore(today)) {
      if (moment(t.date).isSameOrAfter(yearAgo)) {
        averageAcc.year += t.value / 12;
        if (moment(t.date).isSameOrAfter(quarterAgo)) {
          averageAcc.quarter += t.value / 3;
          if (moment(t.date).isSameOrAfter(monthAgo)) {
            averageAcc.month += t.value;
          }
        }
      }
    }
  });

  Object.keys(averageAcc).forEach(
    k => (averageAcc[k] = averageAcc[k] == 0 ? '' : averageAcc[k].toFixed(2))
  );
  return averageAcc;
}
