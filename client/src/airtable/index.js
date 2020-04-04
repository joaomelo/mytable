import { createBatcher } from './batcher';

import { createJobErrorCommand, createTransactionErrorCommand } from './error';
import { createJobPathCommand, createJobLevelCommand } from './path';
import { createJobTransactionsCommand } from './transactions';
import { createJobLivenessCommand } from './status';
import {
  createJobInstancesCommands,
  createJobRecurrenceCommand,
  createJobInstancesRenameCommands
} from './recurrence';

export { updateAirtable };

async function updateAirtable () {
  const batcher = await createBatcher();

  batcher.registerFunction('transactions', createTransactionErrorCommand);
  batcher.registerFunctions('jobs', [
    createJobErrorCommand,
    createJobPathCommand,
    createJobLevelCommand,
    createJobRecurrenceCommand,
    createJobInstancesCommands,
    createJobInstancesRenameCommands,
    createJobTransactionsCommand,
    createJobLivenessCommand
  ]);

  await batcher.run();
  return 'update successfully completed';
}
