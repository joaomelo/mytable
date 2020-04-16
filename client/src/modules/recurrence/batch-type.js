import { RECURRENCE_TYPE, arrayOfChildrenUniqueTitles, getParent } from '__cli/modules/common';

function batchRecurrenceTypeCommand (jobIteration) {
  const { job, item } = jobIteration;
  const recurrenceTypeField = job.frequencyEmojiField;
  const newRecurrenceType = calcRecurrenceType(jobIteration);

  const needsUpdate = item[recurrenceTypeField] !== newRecurrenceType;
  if (needsUpdate) {
    const entries = {
      [recurrenceTypeField]: newRecurrenceType
    };
    job.table.batchUpdate(item.id, entries);
  }
}

function calcRecurrenceType ({ job, item, items }) {
  const { EPHEMERAL, PROCESS, FLAT, COPY, TASK } = RECURRENCE_TYPE;
  const frequencyField = job.frequencyField;

  let recurrenceType = EPHEMERAL;

  if (item[frequencyField]) {
    const uniqueTitles = arrayOfChildrenUniqueTitles({ job, item, items });
    const qtyUniqueChildren = uniqueTitles.length;
    recurrenceType = qtyUniqueChildren <= 1 ? FLAT : PROCESS;
  } else {
    const frequencyField = job.frequencyField;
    const parent = getParent({ item, items, job });
    const isParentRecurrent = (parent && parent[frequencyField]);
    if (isParentRecurrent) {
      recurrenceType = calcRecurrenceType({ item: parent, items, job }) === FLAT ? COPY : TASK;
    }
  };

  return recurrenceType;
}

export { batchRecurrenceTypeCommand, calcRecurrenceType };
