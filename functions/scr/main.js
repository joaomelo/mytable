import * as functions from 'firebase-functions';
import log from './log';
import getSnapshot from './snapshot';
import getBatcher from './batcher';
import getJobsErrorsUpdates from './jobs-error';
import getJobsPathsUpdates from './jobs-path';

export const updateAirtable = functions.https.onCall(async (data, context) => {
  if (context.auth) {
    const snapshot = await getSnapshot();
    const batcher = getBatcher();

    const jobsErrorsUpdates = getJobsErrorsUpdates(snapshot.allJobs);
    batcher.pushMany(jobsErrorsUpdates);

    const jobsPathsUpdates = getJobsPathsUpdates(snapshot.allJobs, snapshot);
    batcher.pushMany(jobsPathsUpdates);

    await batcher.run();

    return 'update successfully completed';
  } else {
    log('not logged user recused');
    throw new functions.https.HttpsError(
      'permission-denied',
      'please login with a valid user'
    );
  }
});

export const scheduledUpdateAirtable = functions.pubsub
  .schedule('every 2 minutes')
  .onRun(context => {
    updateAirtable();
    return null;
  });
