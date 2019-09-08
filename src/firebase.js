// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

//the app
export { firebase, fireApp };
//db utilities
export { fireDb, timestamp };

console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

console.log(firebaseConfig);
const fireApp = firebase.initializeApp(firebaseConfig);
console.log(fireApp);

const fireDb = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
