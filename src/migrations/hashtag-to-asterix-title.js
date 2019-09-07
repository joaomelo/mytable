import { convertToDistinctTitle } from '@/airtable/recurrence/utils';

export { convertHashtagToAsterixCommand };

function convertHashtagToAsterixCommand(job, sanpshot) {
  let command;

  const distinct = convertToDistinctTitle(job.title, '*');
  if (job.title !== distinct) {
    command = {
      type: 'update',
      table: 'jobs',
      id: job.id,
      tag: job.title,
      entries: { title: distinct.trim() + '*' }
    };
  }

  return command;
}
