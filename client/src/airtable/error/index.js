import { calcJobError } from './job';
import { calcTransactionsError } from './transaction';

function createTransactionErrorCommand (transaction, snapshot) {
  return createErrorCommand(
    'transactions',
    transaction,
    snapshot,
    calcTransactionsError
  );
}

function createJobErrorCommand (job, snapshot) {
  return createErrorCommand('jobs', job, snapshot, calcJobError);
}

function createErrorCommand (table, item, snapshot, calcError) {
  let command;

  const createCommand = e => ({
    type: 'update',
    table: table,
    id: item.id,
    tag: item.title,
    entries: { error: e }
  });

  const error = calcError(item, snapshot);
  if (error && error !== item.error) {
    command = createCommand(error);
  } else if (!error && item.error) {
    command = createCommand('');
  }

  return command;
}

export {
  createTransactionErrorCommand,
  createJobErrorCommand,
  calcJobError,
  calcTransactionsError
};
