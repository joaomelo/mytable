import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { fireauthMachine } from '__cli/modules/auth';

let __jobsCollection;

function getJobsCollection () {
  if (!__jobsCollection) {
    __jobsCollection = new HotCollection(firedb, 'profiles', {
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

export { getJobs };
