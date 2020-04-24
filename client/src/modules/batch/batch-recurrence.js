import { calcRecurrenceType } from '__cli/modules/common';

function batchRecurrenceType (jobIteration) {
  const { job, item } = jobIteration;
  const recurrenceTypeField = job.recurrenceTypeField;
  const newRecurrenceType = calcRecurrenceType(jobIteration);

  const needsUpdate = item[recurrenceTypeField] !== newRecurrenceType;
  if (needsUpdate) {
    const entries = {
      [recurrenceTypeField]: newRecurrenceType
    };
    job.table.batchUpdate(item.id, entries);
  }
}

export { batchRecurrenceType };
