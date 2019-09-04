import { Schedule, RScheduleConfig } from '@rschedule/rschedule';
import { MomentDateAdapter } from '@rschedule/moment-date-adapter';
import moment from 'moment';

import { checkJob } from './jobs-error';
import { recurringTypes, isFlat } from './jobs-type-recurring';
import { activeTypes, isActive, calcFreshActiveType } from './jobs-type-active';
import { nodeTypes } from './jobs-type-node';

export { createJobsRecurringInstancesCreates };

RScheduleConfig.defaultDateAdapter = MomentDateAdapter;

function createJobsRecurringInstancesCreates(snapshot) {
  const creates = [];
  const unscheduledJobs = calcUnscheduledJobs(snapshot);

  unscheduledJobs.forEach(job =>
    creates.push({
      table: 'jobs',
      tag: `${job.title} #n`,
      entries: {
        title: `${job.title} #n`,
        status: 'available',
        path: `${job.path}/${activeTypes.alive}${job.title} #n`,
        parent_j: [job.id],
        rtype: recurringTypes.instance,
        active: activeTypes.alive,
        ntype: nodeTypes.leaf,
        test: 'flat child creation 5'
      }
    })
  );

  return creates;
}

function calcUnscheduledJobs(snapshot) {
  return snapshot.jobs
    .filter(job => !checkJob(job, snapshot))
    .filter(job => calcFreshActiveType(job) == activeTypes.alive)
    .filter(job => isFlat(job, snapshot))
    .filter(job => !hasActiveChildren(job, snapshot));
}

function hasActiveChildren(job, snapshot) {
  const aliveChildren = snapshot
    .getChildJobs(job)
    .filter(child => isActive(child));
  return aliveChildren.length > 0;
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
