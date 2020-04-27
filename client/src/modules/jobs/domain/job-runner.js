import { loader } from '__cli/core/loader';
import { logThis } from '__cli/modules/logger';
import { batchCommands } from '__cli/modules/batch';
import { jobsCollection } from './jobs';

async function runAllJobs () {
  try {
    loader.start();
    const jobs = await jobsCollection.getItems();
    const jobsPromises = [];
    jobs.forEach(job => {
      jobsPromises.push(runJob(job));
    });
    await Promise.all(jobsPromises);
    logThis('run complete');
  } catch (e) {
    logThis(`${e.name}: ${e.message}`);
    console.error(e);
  } finally {
    loader.stop();
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
