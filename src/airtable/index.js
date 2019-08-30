import { createSnapshot } from './snapshot';
import { Batcher } from './batcher';
import { createJobsErrorsUpdates } from './jobs-error';
import { createJobsTransactionsUpdates } from './jobs-transactions';
import { createTransactionsErrorsUpdates } from './transactions-error';
import { createJobsPathsUpdates } from './jobs-path';
import { startAirtable } from './base';

export { updateAirtable, startAirtable };

async function updateAirtable() {
  const snapshot = await createSnapshot();
  const batcher = new Batcher();

  batcher.pushMany(createJobsErrorsUpdates(snapshot));
  batcher.pushMany(createTransactionsErrorsUpdates(snapshot));
  batcher.pushMany(createJobsPathsUpdates(snapshot));
  batcher.pushMany(createJobsTransactionsUpdates(snapshot));

  await batcher.run();
  return 'update successfully completed';
}
