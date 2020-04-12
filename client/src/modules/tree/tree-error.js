function batchTreeErrorCommand (item, job) {
  const errorField = job.errorField;
  const error = calcTreeError(item, job);

  const needsBatch =
    (error && error !== item[errorField]) ||
    (!error && item[errorField]);

  if (needsBatch) {
    const entries = {
      [errorField]: error || ''
    };
    job.collection.batchUpdate(item.id, entries);
  }
  return error;
}

function calcTreeError (item, job) {
  if (!item[job.titleField]) {
    return 'item has no title';
  }

  if (item[job.parentField] && item.id === item[job.parentField][0]) {
    return 'item parent is pointing to himself';
  }
}

export { calcTreeError, batchTreeErrorCommand };
