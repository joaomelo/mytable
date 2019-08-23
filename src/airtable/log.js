import { fireDb, timestamp } from '@/firebase';

export default async function(text) {
  await fireDb.collection('logs').add({
    when: timestamp,
    msg: text
  });
}
