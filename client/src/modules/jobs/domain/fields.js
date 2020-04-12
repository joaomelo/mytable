function getFieldsMap (job) {
  const fieldsMap = new Map();

  Object.keys(job)
    .filter(key => key.includes('Field'))
    .forEach(fieldKey => {
      fieldsMap.set(fieldKey, job[fieldKey]);
    });

  return fieldsMap;
}

function getNativeFields (job) {
  const fieldsMap = getFieldsMap(job);
  const nativeFields = [...fieldsMap.values()];
  return nativeFields;
}

export { getFieldsMap, getNativeFields };
