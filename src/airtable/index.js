import { startAirtable } from './base';

import { createSnapshot } from './snapshot';
import { Batcher } from './batcher';

import { createTransactionsErrorsUpdates } from './transactions-error';
import { createJobsErrorsUpdates } from './jobs-error';
import { createJobsTypeUpdates } from './jobs-type';
import { createJobsPathsUpdates } from './jobs-path';
import { createJobsTransactionsUpdates } from './jobs-transactions';

export { updateAirtable, startAirtable };

async function updateAirtable() {
  const snapshot = await createSnapshot();
  const batcher = new Batcher();

  batcher.pushMany(createTransactionsErrorsUpdates(snapshot));
  batcher.pushMany(createJobsErrorsUpdates(snapshot));
  batcher.pushMany(createJobsTypeUpdates(snapshot));
  batcher.pushMany(createJobsPathsUpdates(snapshot));
  batcher.pushMany(createJobsTransactionsUpdates(snapshot));

  await batcher.run();
  return 'update successfully completed';
}
