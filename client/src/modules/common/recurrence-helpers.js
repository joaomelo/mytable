function isRecurrent ({ item, job }) {
  const frequencyField = job.frequencyField;
  return !!item[frequencyField];
}

export { isRecurrent };
