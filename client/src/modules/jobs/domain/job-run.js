import { batchTreeCommands } from '__cli/modules/tree';
import { getJobs } from './jobs';

async function runAllJobs () {
  const jobs = await getJobs();
  const promises = [];
  jobs.forEach(job => {
    promises.push(runJob(job));
  });
  return Promise.all(promises);
}

async function runJob (job) {
  const items = await job.collection.getItems();
  items.forEach(item => {
    const jobIteration = {
      item,
      items,
      job
    };
    batchTreeCommands(jobIteration);
    // batchRecurrenceCommands(job);
  });
  job.collection.runBatches();
}

export { runAllJobs };
