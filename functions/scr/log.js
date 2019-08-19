import admin from 'firebase-admin';
admin.initializeApp();

export default async function(text) {
  await admin
    .firestore()
    .collection('logs')
    .add({
      when: admin.firestore.FieldValue.serverTimestamp(),
      msg: text
    });
}
