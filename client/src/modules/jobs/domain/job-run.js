import { AirtableCollection } from '__cli/modules/airtable';
import { batchTreeCommands } from '__cli/modules/tree';
import { getJobs } from './jobs';
import { getFieldsMap, getNativeFields } from './fields';

async function runAllJobs () {
  const jobs = await getJobs();
  const promises = [];
  jobs.forEach(job => {
    promises.push(runJob(job));
  });
  return Promise.all(promises);
}

async function runJob (job) {
  const collection = createJobCollection(job);
  const jobRun = {
    job,
    collection,
    fieldsMap: getFieldsMap(job)
  };

  batchTreeCommands(jobRun);
  // batchRecurrenceCommands(jobRun);
  // runBatches
}

function createJobCollection (job) {
  const apiKey = job.apiKey;
  const baseId = job.baseId;
  const name = job.collection;
  const fields = getNativeFields(job);
  const collection = new AirtableCollection(apiKey, baseId, name, fields);
  return collection;
}

export { runAllJobs };
