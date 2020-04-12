import HotCollection from '@joaomelo/hot-collection';
import moment from 'moment';
import { firedb } from '__cli/core/firebase';

let __logsCollection;

function getLogsCollection () {
  if (!__logsCollection) {
    __logsCollection = new HotCollection(firedb, 'logs', {
      orderBy: {
        field: 'when',
        sort: 'desc'
      },
      adapters: {
        docToItem (doc) {
          return {
            msg: doc.msg,
            when: moment(doc.when.toDate()).format('YY-MMM-DD HH:mm:ss')
          };
        }
      },
      limit: 100
    });
  }
  return __logsCollection;
}

function subscribe (callback) {
  const logsCollection = getLogsCollection();
  logsCollection.subscribe(callback);
}

function logThis (msg) {
  const logsCollection = getLogsCollection();
  const now = new Date();
  return logsCollection.add({
    when: now,
    msg
  });
}

export { subscribe, logThis };
