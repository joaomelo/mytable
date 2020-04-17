import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { fireauthMachine } from '__cli/modules/auth';
import { Table } from '__cli/modules/table';

let __jobsCollection;

function getJobsCollection () {
  if (!__jobsCollection) {
    __jobsCollection = new HotCollection(firedb, 'jobs', {
      adapters: {
        docToItem: docToJobAdapter,
        itemToDoc: jobToDocAdapter
      },
      saveMode: 'safe',
      where: [{
        field: 'userId',
        operator: '==',
        value: fireauthMachine.user.uid
      }]
    });
  }
  return __jobsCollection;
}

function docToJobAdapter (doc) {
  const job = { ...doc };

  // creating airtable table
  const userFields = Object.keys(doc)
    .filter(key => key.includes('Field'))
    .map(fieldKey => doc[fieldKey])
    .flat();

  const apiKey = doc.apiKey;
  const baseId = doc.baseId;
  const name = doc.tableName;
  const table = new Table(apiKey, baseId, name, userFields);
  job.table = table;

  return job;
}

function jobToDocAdapter (job) {
  delete job.table; // removing table reference before saving
  const doc = { ...job };
  doc.userId = fireauthMachine.user.uid;
  return doc;
}

export { getJobsCollection };
