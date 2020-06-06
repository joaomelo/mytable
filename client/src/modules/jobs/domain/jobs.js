import Vue from 'vue';
import { authMech } from '__cli/core/auth';
import { Table } from '__cli/modules/table';

const jobsStore = {
  job: null,
  updateJob (newJob) { return updateJob(newJob); }
};
Vue.observable(jobsStore);

authMech.subscribe(({ userData, status }) => {
  if (status !== 'SIGNEDIN') {
    jobsStore.job = null;
    return;
  }

  const job = cleanFields(userData);
  if (job.apiKey) {
    // creating airtable table
    const userFields = Object.keys(job)
      .filter(key => key.includes('Field'))
      .map(fieldKey => job[fieldKey])
      .flat();

    const apiKey = job.apiKey;
    const baseId = job.baseId;
    const name = job.tableName;
    const table = new Table(apiKey, baseId, name, userFields);
    job.table = table;
  }
  jobsStore.job = job;
});

function updateJob (newJob) {
  const newJobData = cleanFields(newJob);
  return authMech.updateProps(newJobData);
};

function cleanFields (job) {
  const cleanJob = { ...job };
  const fieldsToRemove = [
    'table', // removing table reference before saving
    'displayName',
    'email',
    'emailVerified',
    'isAnonymous',
    'phoneNumber',
    'photoUrl',
    'uid'
  ];
  fieldsToRemove.forEach(f => { delete cleanJob[f]; });
  return cleanJob;
}

export { jobsStore };
