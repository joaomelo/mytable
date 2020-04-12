import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { fireauthMachine } from '__cli/modules/auth';
import { AirtableCollection } from '__cli/modules/airtable';

let __jobsCollection;

function getJobsCollection () {
  if (!__jobsCollection) {
    __jobsCollection = new HotCollection(firedb, 'profiles', {
      adapters: {
        docToItem: docToJobAdapter
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

async function getJobs () {
  const collection = getJobsCollection();
  const jobs = await collection.getItems();
  return jobs;
}

function docToJobAdapter (doc) {
  const job = {};

  // defining fields map as properties inside job
  const userFields = [];
  Object.keys(doc)
    .filter(key => key.includes('Field'))
    .forEach(fieldKey => {
      const userField = doc[fieldKey];
      userFields.push(userField);
      job[fieldKey] = userField;
    });

  // airtable collection
  const apiKey = doc.apiKey;
  const baseId = doc.baseId;
  const name = doc.collection;
  const collection = new AirtableCollection(apiKey, baseId, name, userFields);
  job.collection = collection;

  return job;
}

export { getJobs };
