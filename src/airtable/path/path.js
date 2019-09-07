import { calcJobError } from '@/airtable/error';
import { calcJobLiveness } from '@/airtable/status';
import { calcJobRecurrence } from '@/airtable/recurrence';

export { createJobPathCommand, calcJobPath };

function createJobPathCommand(job, snapshot) {
  let command;

  if (!calcJobError(job, snapshot)) {
    const newPath = calcJobPath(job, snapshot);
    if (!job.path || job.path !== newPath) {
      command = {
        type: 'update',
        table: 'jobs',
        id: job.id,
        tag: job.title,
        entries: { path: newPath }
      };
    }
  }

  return command;
}

function calcJobPath(job, snapshot) {
  let path = pathString(job, snapshot);
  let parent = snapshot.getParent(job);

  while (parent) {
    path = pathString(parent, snapshot) + '/' + path;
    parent = snapshot.getParent(parent);
  }

  return path;
}

function pathString(job, snapshot) {
  const pos = (string, char, qtd) => {
    let pos = -1;
    let occ = 0;
    while (occ < qtd) {
      pos = string.indexOf(char, pos + 1);
      occ++;
    }
    return pos;
  };

  const fullStr =
    calcJobLiveness(job, snapshot) +
    calcJobRecurrence(job, snapshot) +
    job.title.trim();
  const dot = '..';

  const match = fullStr.match(new RegExp(' ', 'gi'));
  const howMany = match ? match.length : 0;

  const hasOneOrLess = howMany <= 1;
  const hasTwoWithPreposition =
    howMany === 2 && pos(fullStr, ' ', 1) - pos(fullStr, ' ', 2) <= 3;
  const hasSecondVeryCloseToTheEnd =
    howMany >= 2 && fullStr.length < pos(fullStr, ' ', 2) + dot.length;

  if (hasOneOrLess || hasTwoWithPreposition || hasSecondVeryCloseToTheEnd) {
    return fullStr;
  } else {
    return fullStr.substring(0, pos(fullStr, ' ', 2)) + dot;
  }
}
