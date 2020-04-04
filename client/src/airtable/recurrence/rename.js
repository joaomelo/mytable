import { calcJobError } from '@/airtable/error';
import {
  isFlat,
  instanceTag,
  createChildrenUniqueDistinctTitles
} from './utils';

export { createJobInstancesRenameCommands };

function createJobInstancesRenameCommands (job, snapshot) {
  const commands = [];

  if (!calcJobError(job, snapshot) && isFlat(job, snapshot)) {
    const titles = createChildrenUniqueDistinctTitles(job, snapshot);
    if (titles.length !== 0 && titles[0] !== job.title) {
      const children = snapshot.getChildJobs(job);
      children.forEach(child => {
        const command = {
          type: 'update',
          table: 'jobs',
          id: child.id,
          tag: child.title,
          entries: {
            title: job.title + instanceTag
          }
        };
        commands.push(command);
      });
    }
  }

  return commands.length > 0 ? commands : undefined;
}
