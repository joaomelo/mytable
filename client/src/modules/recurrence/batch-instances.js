import moment from 'moment';
import { isRecurrent, getChildren } from '__cli/modules/common';

import { calcJobLiveness, isActive, hasAliveChildren } from '__cli/modules/recurrence/recurrence/__cli/modules/runner/recurrence/__cli/airtable/status';
import { calcJobPath } from '__cli/modules/recurrence/recurrence/__cli/modules/runner/recurrence/__cli/airtable/path';
import { calcJobRecurrence } from './batch-type';
import {
//  isRecurrent,
  arrayOfChildrenUniqueTitles,
  instanceTag
} from '../common/delete-me-helpers2';

function batchRecurrenceInstances (jobIteration) {
  const { item, items, job } = jobIteration;

  const isUnscheduledJob = isRecurrent(jobIteration) &&
    isActive(item) &&
    !hasAliveChildren(jobIteration);

  if (isUnscheduledJob(jobIteration)) {
    let template = {
      title: 'template',
      status: 'available',
      cycle: item.cycle,
      parent: [item.id]
    };
    template.recurrence = calcJobRecurrence({ template, items, job });
    template.liveness = calcJobLiveness({ template, items, job });
    template = { ...template, ...createDateEntry(jobIteration) };

    let childrenTitles = arrayOfChildrenUniqueTitles(jobIteration);
    if (childrenTitles.length === 0) {
      childrenTitles = [item.title];
    }

    childrenTitles.forEach(title => {
      const child = { ...template };
      child.title = title + instanceTag;
      child.path = calcJobPath({ child, items, job });

      job.table.batchCreate({
        type: 'create',
        collection: 'jobs',
        tag: child.title,
        entries: child
      });
    });
  }
}

function createDateEntry (jobIteration) {
  const { item } = jobIteration;

  let nextDate = calcNextDate(jobIteration);
  if (!nextDate) {
    nextDate = moment().startOf('day');
  }

  const dateKey = item.starting ? 'start' : 'end';
  return {
    [dateKey]: nextDate.toISOString()
  };
}

function calcNextDate (jobIteration) {
  const { item } = jobIteration;

  const frequencyKeys = {
    daily: 'days',
    weekly: 'weeks',
    monthly: 'months',
    yearly: 'years'
  };

  const frequency = frequencyKeys[item.frequency];
  const interval = item.interval ? item.interval : 1;

  const today = moment().startOf('day');
  const baseline = calcCycledDate(jobIteration);
  const cycled = moment(baseline).add(interval, frequency);

  let nextDate;

  if (frequency === 'days' || (!item.byday && !item.bymonth)) {
    nextDate = moment.max(cycled, today);
  } else {
    if (frequency === 'weeks') {
      nextDate = moment(baseline).add(1, 'days');
    }
  }

  return nextDate;
}

function calcCycledDate (jobIteration) {
  let recentestEnd;

  const children = getChildren(jobIteration);
  children.forEach(child => {
    const childEnd = moment(child.end);
    if (child.end && (!baseline || childEnd.isAfter(baseline))) {
      recentestEnd = childEnd;
    }
  });

  let baseline;
  if (!recentestEnd) {
    baseline = moment()
      .startOf('day')
      .subtract(1, 'days');
  }

  // if cycled date is after today just bring it back to today

  return baseline;
}

export { batchRecurrenceInstances };
