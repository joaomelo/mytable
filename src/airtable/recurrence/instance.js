import moment from 'moment';

import { calcJobError } from '@/airtable/error';
import { calcJobLiveness, isActive, hasAliveChildren } from '@/airtable/status';
import { calcJobPath, calcJobLevel } from '@/airtable/path';
import { calcJobRecurrence } from './recurrence';
import {
  isRecurrent,
  createChildrenUniqueDistinctTitles,
  instanceTag
} from './utils';

export { createJobInstancesCommands };

function createJobInstancesCommands(job, snapshot) {
  let commands = [];

  if (isUnscheduledJob(job, snapshot)) {
    let template = {
      title: 'template',
      status: 'available',
      cycle: job.cycle,
      parent: [job.id]
    };
    template.level = calcJobLevel(template, snapshot);
    template.recurrence = calcJobRecurrence(template, snapshot);
    template.liveness = calcJobLiveness(template, snapshot);
    template = { ...template, ...createDateEntry(job, snapshot) };

    let childrenTitles = createChildrenUniqueDistinctTitles(job, snapshot);
    if (childrenTitles.length == 0) {
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

function isUnscheduledJob(job, snapshot) {
  return (
    !calcJobError(job, snapshot) &&
    isRecurrent(job) &&
    isActive(job) &&
    !hasAliveChildren(job, snapshot)
  );
}

function createDateEntry(job, snapshot) {
  let nextDate = calcNextDate(job, snapshot);
  if (!nextDate) {
    nextDate = moment().startOf('day');
  }

  const dateKey = job.starting ? 'start' : 'end';
  return {
    [dateKey]: nextDate.toISOString()
  };
}

function calcNextDate(job, snapshot) {
  const frequencyKeys = {
    daily: 'days',
    weekly: 'weeks',
    monthly: 'months',
    yearly: 'years'
  };

  const frequency = frequencyKeys[job.frequency];
  const interval = job.interval ? job.interval : 1;
  const recentestEnd = calcRecentestEnd(job, snapshot);
  let nextDate;

  if (frequency === 'days' || (!job.byday && !job.bymonth)) {
    if (!recentestEnd) {
      nextDate = moment().startOf('day');
    } else {
      const cycled = moment(recentestEnd).add(interval, frequency);
      const nextDate = moment.max(cycled, moment().startOf('day'));
    }
  }

  console.log(job.title, nextDate);
  return nextDate;
}

function calcRecentestEnd(job, snapshot) {
  let end;

  const children = snapshot.getChildJobs(job, snapshot);
  children.forEach(child => {
    const childEnd = moment(child.end);
    if (child.end && (childEnd.isAfter(end) || !end)) {
      end = childEnd;
    }
  });

  return end;
}
