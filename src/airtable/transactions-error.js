import { checkTransaction } from './error';

export { getTransactionsErrorsUpdates };

function getTransactionsErrorsUpdates(snapshot) {
  const updates = [];

  snapshot.transactions.forEach(t => {
    const error = checkTransaction(t);
    let entry;
    if (error && t.error != error) {
      updates.push({
        table: 'transactions',
        id: t.id,
        newEntries: { error: error }
      });
    } else if (!error && t.error) {
      updates.push({
        table: 'transactions',
        id: t.id,
        newEntries: { error: '' }
      });
    }
  });
  return updates;
}
