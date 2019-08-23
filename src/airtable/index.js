import { createSnapshot } from './snapshot';
import { Batcher } from './batcher';
import getJobsErrorsUpdates from './jobs-error';
import { getTransactionsErrorsUpdates } from './transactions-error';
import getJobsPathsUpdates from './jobs-path';

export default async function updateAirtable() {
  const snapshot = await createSnapshot();
  const batcher = new Batcher();

  batcher.pushMany(getJobsErrorsUpdates(snapshot));
  batcher.pushMany(getTransactionsErrorsUpdates(snapshot));
  batcher.pushMany(getJobsPathsUpdates(snapshot));

  await batcher.run();
  return 'update successfully completed';
}
