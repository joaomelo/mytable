import log from '@/log';
import cache from './cache';
import batcher from './batcher';
import batchJobsPaths from './jobs-path';
import batchJobsErrors from './jobs-error';

export default async function() {
  batcher.clear();
  await cache.reload();

  batchJobsErrors();
  batchJobsPaths();
  await batcher.run();
}
