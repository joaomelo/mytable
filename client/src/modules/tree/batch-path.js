import { getParent, removeTitleTags } from '__cli/modules/common';

function batchPathCommand (jobIteration) {
  const { job, item } = jobIteration;
  const pathField = job.pathField;
  const newPath = calcPath(jobIteration);

  const needsUpdate = (item[pathField] !== newPath);
  if (needsUpdate) {
    const entries = {
      [pathField]: newPath
    };
    job.table.batchUpdate(item.id, entries);
  }
}

function calcPath (jobIteration) {
  const { item, items, job } = jobIteration;
  let path = verticeString(item, job);
  let parent = getParent({ item, items, job });

  while (parent) {
    path = verticeString(parent, job) + '/' + path;
    parent = getParent({ item: parent, items, job });
  }

  return path;
}

function verticeString (item, job) {
  const statusEmojiField = job.statusEmojiField;
  const statusEmoji = item[statusEmojiField] || '';

  const titleField = job.titleField;
  const pureTitle = removeTitleTags(item[titleField]);

  const verticeStr = statusEmoji + pureTitle;
  return verticeStr;
}

export { batchPathCommand };
