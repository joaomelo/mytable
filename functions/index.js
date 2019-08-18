const functions = require('firebase-functions');
//import Airtable from 'airtable';
//import update from './airtable/upate';

exports.updateAirtable = functions.https.onCall((data, context) => {
  if (context.auth) {
    //await update()
    return { msg: 'update complete' };
  } else {
    throw new functions.https.HttpsError(
      'permission-denied',
      'please login with a valid user'
    );
  }
});

exports.scheduledUpdateAirtable = functions.pubsub
  .schedule('every 2 minutes')
  .onRun(context => {
    updateAirtable();
    return null;
  });
