import { batchCommands } from '__cli/modules/batch';
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
    batchCommands(jobIteration);
  });
  return job.table.dispatchCommandBatch();
}

export { runAllJobs };
