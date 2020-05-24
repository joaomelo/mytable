import { logThis } from '__cli/modules/logger';
import { batchCommands } from '__cli/modules/batch';
import { jobsStore } from './jobs';

async function runAllJobs () {
  if (!jobsStore.job) {
    throw new Error('No jobs available');
  }

  try {
    logThis("started the job's run");
    const jobsPromises = [];
    jobsPromises.push(runJob(jobsStore.job));
    await Promise.all(jobsPromises);
    logThis('run complete');
  } catch (e) {
    logThis(`${e.name}: ${e.message}`);
    console.error(e);
  }
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
