import { removeTitleTags } from './title';

function getParent ({ item, items, job }) {
  const parentId = item[job.parentField] ? item[job.parentField][0] : null;
  const parent = parentId
    ? items.find(possibleParent => possibleParent.id === parentId && possibleParent.id !== item.id)
    : null;
  return parent;
}

function getChildren ({ item, items, job }) {
  const parentField = job.parentField;
  const children = items.filter(possibleChild => {
    const possibleChildParent = possibleChild[parentField];
    return possibleChildParent && possibleChildParent[0] === item.id;
  });
  return children;
}

function countDepth (jobIteration) {
  const { items, job } = jobIteration;

  let depth = 0;

  let parent = getParent(jobIteration);
  while (parent) {
    depth++;
    parent = getParent({ item: parent, items, job });
  };

  return depth;
}

function mountPath (jobIteration) {
  const { item, items, job } = jobIteration;
  let path = verticeString(jobIteration);
  let parent = getParent({ item, items, job });

  while (parent) {
    path = verticeString({ item: parent, items, job }) + '/' + path;
    parent = getParent({ item: parent, items, job });
  }

  return path;
}

function verticeString (jobIteration) {
  const { item, job } = jobIteration;
  const prefix = job.prependStatusToPath ? item[job.statusField] : '';
  const title = removeTitleTags(jobIteration);
  const verticeStr = prefix + title;
  return verticeStr;
}

export { getParent, getChildren, mountPath, countDepth };
