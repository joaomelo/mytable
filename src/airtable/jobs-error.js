import { checkJob } from './error';

export default function(snapshot) {
  const updates = [];

  snapshot.jobs.forEach(j => {
    const error = checkJob(j);
    if (error) {
      updates.push({ table: 'jobs', id: j.id, newEntries: { error: error } });
    } else if (j.error) {
      updates.push({ table: 'jobs', id: j.id, newEntries: { error: '' } });
    }
  });
  return updates;
}
