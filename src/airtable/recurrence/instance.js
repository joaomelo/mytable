// import { Schedule, RScheduleConfig } from '@rschedule/rschedule';
// import { MomentDateAdapter } from '@rschedule/moment-date-adapter';
// import moment from 'moment';

import { calcJobError } from '@/airtable/error';
import { calcJobLiveness, isActive, hasAliveChildren } from '@/airtable/status';
import { calcJobPath, calcJobLevel } from '@/airtable/path';
import { calcJobRecurrence } from './recurrence';
import { isFlat } from './utils';

export { createJobInstancesCommands };

// RScheduleConfig.defaultDateAdapter = MomentDateAdapter;

function createJobInstancesCommands(job, snapshot) {
  let command;

  if (isUnscheduledJobs(job, snapshot)) {
    const child = {
      title: `${job.title}*`,
      status: 'available',
      cycle: job.cycle,
      parent: [job.id]
    };

    child.path = calcJobPath(child, snapshot);
    child.level = calcJobLevel(child, snapshot);
    child.recurrence = calcJobRecurrence(child, snapshot);
    child.liveness = calcJobLiveness(child, snapshot);

    command = {
      type: 'create',
      table: 'jobs',
      tag: `${job.title}*`,
      entries: child
    };
  }

  return command;
}

function isUnscheduledJobs(job, snapshot) {
  return (
    !calcJobError(job, snapshot) &&
    isFlat(job, snapshot) &&
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
