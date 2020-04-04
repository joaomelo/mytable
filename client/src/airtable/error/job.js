import { hasRecurringAscendency } from '@/airtable/recurrence';
export { calcJobError };

function calcJobError (job, snapshot) {
  if (!job.title) {
    return 'has no title';
  }

  if (job.parent && job.id === job.parent[0]) {
    return 'parent is pointing to himself';
  }

  if (job.frequency && hasRecurringAscendency(job, snapshot)) {
    return 'you can not have a recurring job inside another one';
  }
}
