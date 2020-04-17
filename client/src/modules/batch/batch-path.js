import { mountPath } from '__cli/modules/common';

function batchPath (jobIteration) {
  const { job, item } = jobIteration;
  const pathField = job.pathField;
  const newPath = mountPath(jobIteration);

  const needsUpdate = (item[pathField] !== newPath);
  if (needsUpdate) {
    const entries = {
      [pathField]: newPath
    };
    job.table.batchUpdate(item.id, entries);
  }
}

export { batchPath };
