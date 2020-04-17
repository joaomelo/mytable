import { getParent } from './tree';
import { RECURRENCE_TYPE } from './types';

function isRecurrent ({ item, job }) {
  const frequencyField = job.frequencyField;
  return !!item[frequencyField];
}

function calcRecurrenceType ({ job, item, items }) {
  const { SINGLE, PROCESS, TASK } = RECURRENCE_TYPE;
  const frequencyField = job.frequencyField;

  let recurrenceType = SINGLE;

  const parent = getParent({ item, items, job });
  const isParentRecurrent = (parent && parent[frequencyField]);
  if (isParentRecurrent) {
    recurrenceType = TASK;
  } else if (item[frequencyField]) {
    recurrenceType = PROCESS;
  };

  return recurrenceType;
}

export { isRecurrent, calcRecurrenceType };
