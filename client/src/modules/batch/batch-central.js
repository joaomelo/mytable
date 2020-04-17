import { batchError } from './batch-error';
import { batchPath } from './batch-path';
import { batchRecurrence } from './batch-recurrence';
import { batchInstances } from './batch-instances';

function batchCommands (jobIteration) {
  const error = batchError(jobIteration);
  if (!error) {
    batchPath(jobIteration);
    batchRecurrence(jobIteration);
    batchInstances(jobIteration);
  }
}

export { batchCommands };
