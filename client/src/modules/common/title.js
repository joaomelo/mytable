import { RECURRENCE_TYPE } from './types';

function removeTitleTags (title) {
  const tags = [...Object.values(RECURRENCE_TYPE), '_', '*'];
  const arrayOfChars = [...title];

  let startCut = 0;
  while (tags.includes(arrayOfChars[startCut])) {
    startCut++;
  }

  let endCut = arrayOfChars.length - 1;
  while (tags.includes(arrayOfChars[endCut])) {
    endCut--;
  }

  const pureTitle = title.slice(startCut, endCut + 1).trim();
  return pureTitle;
}

export { removeTitleTags };
