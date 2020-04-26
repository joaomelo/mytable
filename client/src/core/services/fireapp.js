const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

let fireapp, fireauth, firedb;

async function initFirebase () {
  if (!fireapp) {
    const { default: firebase } = await import(/* webpackChunkName: "firebase" */ 'firebase/app');
    fireapp = fireapp || firebase.initializeApp(firebaseConfig);
  }

  await Promise.all([
    import(/* webpackChunkName: "firebase" */ 'firebase/auth'),
    import(/* webpackChunkName: "firebase" */ 'firebase/firestore')
  ]);

  fireauth = fireapp.auth();
  firedb = fireapp.firestore();
}

export { initFirebase, fireapp, fireauth, firedb };
