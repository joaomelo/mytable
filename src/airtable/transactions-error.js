export { checkTransaction, createTransactionsErrorsUpdates };

function checkTransaction(transaction) {
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

function createTransactionsErrorsUpdates(snapshot) {
  const updates = [];

  snapshot.transactions.forEach(t => {
    const error = checkTransaction(t);
    const createUpdate = e => ({
      table: 'transactions',
      id: t.id,
      newEntries: { error: e }
    });

    if (error && error != t.error) {
      updates.push(createUpdate(error));
    } else if (!error && t.error) {
      updates.push(createUpdate(''));
    }
  });

  return updates;
}
