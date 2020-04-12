function batchTreeErrorCommand (jobIteration) {
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
    job.collection.batchUpdate(item.id, entries);
  }
  return newError;
}

function calcTreeError (jobIteration) {
  const { item, job } = jobIteration;
  if (!item[job.titleField]) {
    return 'item has no title';
  }

  if (item[job.parentField] && item.id === item[job.parentField][0]) {
    return 'item parent is pointing to himself';
  }
}

export { calcTreeError, batchTreeErrorCommand };
