import { fireDb, timestamp } from '@/firebase';

export { log };

function log(text) {
  return fireDb.collection('logs').add({
    when: timestamp,
    msg: text
  });
}
