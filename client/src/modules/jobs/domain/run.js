import { loader } from '__cli/core/loader';
import { logThis } from '__cli/modules/logger';
import { batchCommands } from '__cli/modules/batch';
import { jobsCollectionUpdateSignal } from './jobs';

let allJobs = [];
jobsCollectionUpdateSignal.subscribe(jobsCollection => jobsCollection && jobsCollection.subscribe(jobs => { allJobs = jobs; }));

async function runAllJobs () {
  if (!allJobs || allJobs.length <= 0) {
    throw new Error('No jobs available');
  }

  try {
    loader.start();
    logThis('started to run jobs');
    const jobsPromises = [];
    allJobs.forEach(job => {
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
