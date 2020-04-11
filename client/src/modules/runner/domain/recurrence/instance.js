import moment from '__cli/modules/runner/recurrence/moment';

import { calcJobError } from '__cli/modules/runner/recurrence/__cli/airtable/error';
import { calcJobLiveness, isActive, hasAliveChildren } from '__cli/modules/runner/recurrence/__cli/airtable/status';
import { calcJobPath } from '__cli/modules/runner/recurrence/__cli/airtable/path';
import { calcJobRecurrence } from './recurrence';
import {
  isRecurrent,
  createChildrenUniqueDistinctTitles,
  instanceTag
} from './utils';

export { createJobInstancesCommands };

function createJobInstancesCommands (job, snapshot) {
  const commands = [];

  if (isUnscheduledJob(job, snapshot)) {
    let template = {
      title: 'template',
      status: 'available',
      cycle: job.cycle,
      parent: [job.id]
    };
    template.recurrence = calcJobRecurrence(template, snapshot);
    template.liveness = calcJobLiveness(template, snapshot);
    template = { ...template, ...createDateEntry(job, snapshot) };

    let childrenTitles = createChildrenUniqueDistinctTitles(job, snapshot);
    if (childrenTitles.length === 0) {
      childrenTitles = [job.title];
    }

    childrenTitles.forEach(title => {
      const child = { ...template };
      child.title = title + instanceTag;
      child.path = calcJobPath(child, snapshot);

      commands.push({
        type: 'create',
        table: 'jobs',
        tag: child.title,
        entries: child
      });
    });
  }

  return commands.length > 0 ? commands : undefined;
}

function isUnscheduledJob (job, snapshot) {
  return (
    !calcJobError(job, snapshot) &&
    isRecurrent(job) &&
    isActive(job) &&
    !hasAliveChildren(job, snapshot)
  );
}

function createDateEntry (job, snapshot) {
  let nextDate = calcNextDate(job, snapshot);
  if (!nextDate) {
    nextDate = moment().startOf('day');
  }

  const dateKey = job.starting ? 'start' : 'end';
  return {
    [dateKey]: nextDate.toISOString()
  };
}

function calcNextDate (job, snapshot) {
  const frequencyKeys = {
    daily: 'days',
    weekly: 'weeks',
    monthly: 'months',
    yearly: 'years'
  };

  const frequency = frequencyKeys[job.frequency];
  const interval = job.interval ? job.interval : 1;

  const today = moment().startOf('day');
  const baseline = calcCycledDate(job, snapshot);
  const cycled = moment(baseline).add(interval, frequency);

  let nextDate;

  if (frequency === 'days' || (!job.byday && !job.bymonth)) {
    nextDate = moment.max(cycled, today);
  } else {
    if (frequency === 'weeks') {
      nextDate = moment(baseline).add(1, 'days');
    }
  }

  return nextDate;
}

function calcCycledDate (job, snapshot) {
  let recentestEnd;

  const children = snapshot.getChildJobs(job, snapshot);
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
