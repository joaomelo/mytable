import { BehaviorSubject } from 'rxjs';
import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { authSubject } from '__cli/core/auth';
import { Table } from '__cli/modules/table';

const jobsCollectionUpdateSignal = new BehaviorSubject(null);
authSubject.subscribe(({ user, status }) => {
  const jobsCollection = status === 'SIGNIN'
    ? createJobsCollection(user.uid)
    : null;
  jobsCollectionUpdateSignal.next(jobsCollection);
});

function createJobsCollection (userId) {
  const jobsCollection = new HotCollection('jobs', {
    adapter: { firestore: firedb },
    converters: {
      fromDocToItem (doc) {
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

export { jobsCollectionUpdateSignal };
