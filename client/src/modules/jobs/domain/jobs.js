import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { authSubject } from '__cli/core/auth';
import { Table } from '__cli/modules/table';

let jobsCollection;
authSubject.subscribe(({ user, status }) => {
  if (status === 'SIGNIN') {
    resetJobsCollection(user.uid);
  } else {
    jobsCollection = null;
  }
});

function resetJobsCollection (userId) {
  jobsCollection = new HotCollection(firedb, 'jobs', {
    adapters: {
      docToItem (doc) {
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

      itemToDoc (job) {
        delete job.table; // removing table reference before saving
        const doc = { ...job };
        doc.userId = userId;
        return doc;
      }
    },
    where: [{
      field: 'userId',
      operator: '==',
      value: userId
    }]
  });
};

export { jobsCollection };
