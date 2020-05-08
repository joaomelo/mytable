import HotCollection from '@joaomelo/hot-collection';
import moment from 'moment';
import { authSubject } from '__cli/core/auth';

let logsCollection;
let userId;

authSubject.subscribe(({ user, status }) => {
  if (status === 'SIGNIN') {
    userId = user.uid;
    resetLogsCollection();
  } else {
    logsCollection = null;
  }
});

function resetLogsCollection () {
  logsCollection = new HotCollection('logs', {
    adapter: { localStorage: window.localStorage },
    converters: {
      fromDocToItem (doc) {
        const item = {
          msg: doc.msg,
          when: moment(doc.when).format('YY-MMM-DD HH:mm:ss')
        };
        return item;
      }
    }
  });
}

function subscribe (observer) {
  if (!logsCollection) return;

  logsCollection.subscribe(logs => {
    const filteredAndSortedLogs = logs
      .filter(log => log.userId === userId)
      .sort((a, b) => b.when - a.when);
    observer(filteredAndSortedLogs);
  });
}

async function logThis (msg) {
  const now = new Date();
  return logsCollection.add({
    when: now,
    userId,
    msg
  });
}

export { subscribe, logThis };
