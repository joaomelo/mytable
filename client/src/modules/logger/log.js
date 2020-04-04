import { fireDb, timestamp } from './node_modules/client/src/modules/logger/client/src/modules/airtable/batcher/__cli/firebase';

export { log };

function log (text) {
  return fireDb.collection('logs').add({
    when: timestamp,
    msg: text
  });
}
