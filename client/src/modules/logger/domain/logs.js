import HotCollection from '@joaomelo/hot-collection';
import moment from 'moment';
import { firedb } from '__cli/core/firebase';
import { authSubject } from '__cli/core/auth';

let logsCollection;
authSubject.subscribe(({ user, status }) => {
  if (status === 'SIGNIN') {
    resetLogsCollection(user.uid);
  } else {
    logsCollection = null;
  }
});

function resetLogsCollection (userId) {
  logsCollection = new HotCollection(firedb, 'logs', {
    where: [{
      field: 'userId',
      operator: '==',
      value: userId
    }],
    orderBy: {
      field: 'when',
      sort: 'desc'
    },
    limit: 10,
    adapters: {
      docToItem (doc) {
        return {
          msg: doc.msg,
          when: moment(doc.when.toDate()).format('YY-MMM-DD HH:mm:ss')
        };
      },
      itemToDoc (item) {
        const doc = { ...item };
        doc.userId = userId;
        return doc;
      }
    }
  });
}

function subscribe (callback) {
  logsCollection.subscribe(callback);
}

async function logThis (msg) {
  const now = new Date();
  return logsCollection.add({
    when: now,
    msg
  });
}

export { subscribe, logThis };
