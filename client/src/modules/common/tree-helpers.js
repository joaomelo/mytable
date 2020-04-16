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

export { getParent, getChildren };
