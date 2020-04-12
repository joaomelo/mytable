function calcTreeError (item, fieldsMap) {
  const titleField = fieldsMap.get('titleField');
  const parentField = fieldsMap.get('parentField');

  if (!item[titleField]) {
    return 'item has no title';
  }

  if (item[parentField] && item.id === item[parentField][0]) {
    return 'item parent is pointing to himself';
  }
}

function createErrorCommand (collection, item, snapshot, calcError) {
  let command;

  const createCommand = e => ({
    type: 'update',
    collection: collection,
    id: item.id,
    tag: item.title,
    entries: { error: e }
  });

  const error = calcError(item, snapshot);
  if (error && error !== item.error) {
    command = createCommand(error);
  } else if (!error && item.error) {
    command = createCommand('');
  }

  return command;
}

export { calcTreeError, createErrorCommand };
