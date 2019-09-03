import {
  Schedule,
  // Calendar,
  // Rule,
  // Dates,
  RScheduleConfig
} from '@rschedule/rschedule';
import { MomentDateAdapter } from '@rschedule/moment-date-adapter';
import moment from 'moment';

export { test };

RScheduleConfig.defaultDateAdapter = MomentDateAdapter;
function test() {
  // Example of the same rule using moment
  const schedule = new Schedule({
    rrules: [
      // This rule translates to:
      // "starting on January 7th, 2010, every Sunday and the 3rd Monday in February and June."
      {
        frequency: 'YEARLY',
        byMonthOfYear: [2, 6],
        byDayOfWeek: ['SU', ['MO', 3]],
        start: moment([2010, 0, 7]),
        count: 3
      }
    ]
  });

  const dates = schedule
    .occurrences()
    .toArray()
    .map(adapter => adapter.date.toString());

  console.log(dates);
}
