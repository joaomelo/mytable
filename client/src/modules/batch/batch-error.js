import { getParent } from '__cli/modules/common';

function batchError (jobIteration) {
  const { job, item } = jobIteration;
  const errorField = job.errorField;
  const currentError = item[errorField];
  const newError = calcTreeError(jobIteration);

  const needsUpdate =
    (newError && newError !== currentError) ||
    (!newError && currentError);

  if (needsUpdate) {
    const entries = {
      [errorField]: newError || ''
    };
    job.table.batchUpdate(item.id, entries);
  }
  return newError;
}

function calcTreeError (jobIteration) {
  const { item, job, items } = jobIteration;
  if (!item[job.titleField]) {
    return 'item has no title';
  }

  if (item[job.parentField]) {
    if (item.id === item[job.parentField][0]) {
      return 'item parenthood is pointing to himself';
    }

    const parent = getParent(jobIteration);
    const error = calcTreeError({ item: parent, job, items });
    if (error) {
      return `ascendent has error: ${error.replace('ascendent has error: ', '')}`;
    }
  }
}

export { batchError };
