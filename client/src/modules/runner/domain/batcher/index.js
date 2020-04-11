import { startAirtable } from '../../../airtable/airtable-base';
import { createSnapshot } from './snapshot';
import { Batcher } from './batcher';

export { createBatcher };

async function createBatcher () {
  await startAirtable();
  const snapshot = await createSnapshot();
  return new Batcher(snapshot);
}
