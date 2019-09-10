// import { Schedule, RScheduleConfig } from '@rschedule/rschedule';
// import { MomentDateAdapter } from '@rschedule/moment-date-adapter';
// import moment from 'moment';

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

// RScheduleConfig.defaultDateAdapter = MomentDateAdapter;

function createJobInstancesCommands(job, snapshot) {
  let commands = [];

  if (isUnscheduledJob(job, snapshot)) {
    const template = {
      title: 'template',
      status: 'available',
      cycle: job.cycle,
      parent: [job.id]
    };
    template.level = calcJobLevel(template, snapshot);
    template.recurrence = calcJobRecurrence(template, snapshot);
    template.liveness = calcJobLiveness(template, snapshot);

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
    isRecurrent(job, snapshot) &&
    isActive(job) &&
    !hasAliveChildren(job, snapshot)
  );
}

// function test() {
//   // Example of the same rule using moment
//   const schedule = new Schedule({
//     rrules: [
//       // This rule translates to:
//       // "starting on January 7th, 2010, every Sunday and the 3rd Monday in February and June."
//       {
//         frequency: 'YEARLY',
//         byMonthOfYear: [2, 6],
//         byDayOfWeek: ['SU', ['MO', 3]],
//         start: moment([2010, 0, 7]),
//         count: 3
//       }
//     ]
//   });

//   const dates = schedule
//     .occurrences()
//     .toArray()
//     .map(adapter => adapter.date.toString());

//   console.log(dates);
// }
