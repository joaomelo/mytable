import { removeTitleTags, countDepth } from '__cli/modules/common';

function batchTitle (jobIteration) {
  const { job, item } = jobIteration;
  const titleField = job.titleField;
  const levelSymbol = job.levelTitleSymbol;

  const pureTitle = removeTitleTags(jobIteration);
  const depth = countDepth(jobIteration);

  const newTitle = levelSymbol.repeat(depth) + pureTitle;

  const needsUpdate = (item[titleField] !== newTitle);
  if (needsUpdate) {
    const entries = {
      [titleField]: newTitle
    };
    job.table.batchUpdate(item.id, entries);
  }
}

export { batchTitle };
