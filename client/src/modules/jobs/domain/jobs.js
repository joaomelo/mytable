import Vue from 'vue';
import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { authSubject } from '__cli/core/auth';
import { Table } from '__cli/modules/table';

const jobsStore = {
  jobsCollection: null,
  job: null
};
Vue.observable(jobsStore);

authSubject.subscribe(({ user, status }) => {
  const jobsCollection = status === 'SIGNIN'
    ? createJobsCollection(user.uid)
    : null;

  if (jobsCollection) {
    jobsStore.jobsCollection = jobsCollection;
    jobsCollection.subscribe(jobs => {
      const job = jobs.find(j => j.userId === user.uid);
      if (!job) {
        jobsCollection.set({ id: user.uid });
      } else {
        jobsStore.job = job;
      }
    });
  }
});

function createJobsCollection (userId) {
  const jobsCollection = new HotCollection('jobs', {
    adapter: { firestore: firedb },
    saveMode: 'safe',
    converters: {
      fromDocToItem (doc) {
        const job = { ...doc };

        if (doc.apiKey) {
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
        }

        return job;
      },

      fromItemToDoc (job) {
        delete job.table; // removing table reference before saving
        const doc = { ...job };
        doc.userId = userId;
        return doc;
      }
    },
    query: {
      where: [{
        field: 'userId',
        operator: '==',
        value: userId
      }]
    }
  });

  return jobsCollection;
};

export { jobsStore };
