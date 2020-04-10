export { calcTransactionsError };

function calcTransactionsError (transaction) {
  if (!transaction.job) {
    return 'does not have a job';
  }

  if (!transaction.date) {
    return 'does not have a date';
  }

  if (!transaction.value) {
    return 'does not have a value';
  }
}
