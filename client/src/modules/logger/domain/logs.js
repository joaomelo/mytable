import HotCollection from '@joaomelo/hot-collection';
import moment from 'moment';
import { firedb } from '__cli/core/firebase';
import { fireauthMachine } from '__cli/core/auth';

let __logsCollection;

function getLogsCollection () {
  if (!__logsCollection) {
    fireauthMachine.subscribe(({ status }) => {
      if (status === 'SIGNOUT') { __logsCollection = undefined; };
    });

    __logsCollection = new HotCollection(firedb, 'logs', {
      where: [{
        field: 'userId',
        operator: '==',
        value: fireauthMachine.user.uid
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
          doc.userId = fireauthMachine.user.uid;
          return doc;
        }
      }
    });
  }
  return __logsCollection;
}

function subscribe (callback) {
  getLogsCollection().then(logsCollection => logsCollection.subscribe(callback));
}

async function logThis (msg) {
  const logsCollection = await getLogsCollection();
  const now = new Date();
  return logsCollection.add({
    when: now,
    msg
  });
}

export { subscribe, logThis };
