import { batchErrorCommand } from '__cli/modules/errors';
import { batchTreeCommands } from '__cli/modules/tree';
import { batchRecurrenceCommands } from '__cli/modules/recurrence';
import { getJobsCollection } from './jobs';

async function runAllJobs () {
  const jobCollection = getJobsCollection();
  const jobs = await jobCollection.getItems();
  const promises = [];
  jobs.forEach(job => {
    promises.push(runJob(job));
  });
  return Promise.all(promises);
}

async function runJob (job) {
  const items = await job.table.getItems();
  items.forEach(item => {
    const jobIteration = {
      item,
      items,
      job
    };
    const error = batchErrorCommand(jobIteration);
    if (!error) {
      batchTreeCommands(jobIteration);
      batchRecurrenceCommands(jobIteration);
    }
  });
  return job.table.dispatchCommandBatch();
}

export { runAllJobs };
