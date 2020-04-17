function removeTitleTags (jobIteration) {
  const { item, job } = jobIteration;
  const levelSymbol = job.levelTitleSymbol;

  const title = item[job.titleField];
  const arrayOfChars = [...title];

  let startCut = 0;
  while (levelSymbol === arrayOfChars[startCut]) {
    startCut++;
  }
  const pureTitle = title.slice(startCut, title.length + 1).trim();
  return pureTitle;
}

export { removeTitleTags };
