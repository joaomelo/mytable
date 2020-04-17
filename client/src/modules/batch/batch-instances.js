import moment from 'moment';
import {
  mountPath,
  removeTitleTags,
  getChildren,
  isActive,
  isRecurrent,
  calcRecurrenceType,
  hasActiveChildren
} from '__cli/modules/common';

function batchInstances (jobIteration) {
  const { item, items, job } = jobIteration;

  const isUnscheduledJob = isRecurrent(jobIteration) &&
    isActive(jobIteration) &&
    !hasActiveChildren(jobIteration);

  if (isUnscheduledJob) {
    const instanceTemplate = {
      title: '',
      status: item[job.statusField],
      parent: [item.id]
    };

    job.extraInstanceFields.forEach(field => {
      instanceTemplate[field] = item[field];
    });

    instanceTemplate[job.recurrenceTypeField] = calcRecurrenceType({ item: instanceTemplate, items, job });
    instanceTemplate[solveDateField(jobIteration)] = calcNextDate(jobIteration).toDate();

    let childrenTitles = arrayOfChildrenUniqueTitles(jobIteration);
    if (childrenTitles.length === 0) {
      childrenTitles = [item.title];
    }

    childrenTitles.forEach(title => {
      const child = { ...instanceTemplate };
      child[job.titleField] = title;
      child[job.pathField] = mountPath({ item: child, items, job });

      job.table.batchCreate(child);
    });
  }
}

function arrayOfChildrenUniqueTitles ({ item, items, job }) {
  const titleField = job.titleField;
  const allChildrenTitles = getChildren({ item, items, job }).map(child => child[titleField]);
  const titlesWithoutTags = allChildrenTitles.map(rawTitle => removeTitleTags(rawTitle));
  const uniqueTitles = Array.from(new Set(titlesWithoutTags));
  return uniqueTitles;
}

function calcNextDate (jobIteration) {
  const { item, job } = jobIteration;
  const momentKeys = {
    daily: 'days',
    weekly: 'weeks',
    monthly: 'months',
    yearly: 'years'
  };

  const frequency = momentKeys[item[job.frequencyField]];
  const interval = item[job.intervalField] || 1;
  const baseline = calcRecentestDate(jobIteration);
  const nextDate = moment(baseline).add(interval, frequency);
  return nextDate;
}

function calcRecentestDate (jobIteration) {
  const dateField = solveDateField(jobIteration);
  const childrenDates = getChildren(jobIteration)
    .filter(child => child[dateField])
    .map(child => moment(child[dateField]));
  const recentestDate = moment.max(...childrenDates).startOf('day');
  return recentestDate;
}

function solveDateField ({ item, job }) {
  return item[job.isStartField] ? job.startDateField : job.endDateField;
}

export { batchInstances };
