import { createBatcher } from './batcher';

import { createJobErrorCommand, createTransactionErrorCommand } from './error';
import { createJobPathCommand } from './path';
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
    createJobRecurrenceCommand,
    createJobInstancesCommands,
    createJobInstancesRenameCommands,
    createJobLivenessCommand
  ]);

  await batcher.run();
  return 'update successfully completed';
}
