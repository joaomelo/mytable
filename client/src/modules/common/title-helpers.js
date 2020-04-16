import { RECURRENCE_TYPE } from './char-types';
import { getChildren } from './tree-helpers';

function arrayOfChildrenUniqueTitles ({ item, items, job }) {
  const titleField = job.titleField;
  const allChildrenTitles = getChildren({ item, items, job }).map(child => child[titleField]);
  const titlesWithoutTags = allChildrenTitles.map(rawTitle => removeTitleTags(rawTitle));
  const uniqueTitles = Array.from(new Set(titlesWithoutTags));
  return uniqueTitles;
}

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

export { arrayOfChildrenUniqueTitles, removeTitleTags };
