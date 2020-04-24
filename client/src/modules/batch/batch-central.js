import { batchError } from './batch-error';
import { batchPath } from './batch-path';
import { batchTitle } from './batch-title';
import { batchRecurrenceType } from './batch-recurrence';
import { batchInstances } from './batch-instances';

function batchCommands (jobIteration) {
  const { levelTitleSymbol, isRecurrenceEnabled, recurrenceTypeField } = jobIteration.job;
  const error = batchError(jobIteration);
  if (!error) {
    batchPath(jobIteration);

    if (levelTitleSymbol) {
      batchTitle(jobIteration);
    }

    if (isRecurrenceEnabled) {
      batchInstances(jobIteration);
      if (recurrenceTypeField) {
        batchRecurrenceType(jobIteration);
      }
    }
  }
}

export { batchCommands };
