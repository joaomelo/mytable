import { logThis } from '__cli/modules/logger';
import { batchCommands } from '__cli/modules/batch';
import { getJobsCollection } from './jobs';

const jobRunner = {
  status: 'idle',

  async runAllJobs () {
    if (this.status === 'updating') return;

    try {
      this.status = 'updating';
      const jobCollection = getJobsCollection();
      const jobs = await jobCollection.getItems();
      const jobsPromises = [];
      jobs.forEach(job => {
        jobsPromises.push(this.runJob(job));
      });
      await Promise.all(jobsPromises);
      logThis('run complete');
    } catch (e) {
      logThis(`${e.name}: ${e.message}`);
      console.error(e);
    } finally {
      this.status = 'idle';
    }
  },

  async runJob (job) {
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
};

export { jobRunner };
