// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAXeMQIkRV4Tt-nge3oi4ZG8uOLIc9ny0Y',
  authDomain: 'airtable-149f3.firebaseapp.com',
  databaseURL: 'https://airtable-149f3.firebaseio.com',
  projectId: 'airtable-149f3',
  storageBucket: 'airtable-149f3.appspot.com',
  messagingSenderId: '208811989156',
  appId: '1:208811989156:web:24d015332dda2624'
};

export const fireApp = firebase.initializeApp(firebaseConfig);

export const fireDb = firebase.firestore();

export const emailProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID;
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export function fireLogout() {
  return fireApp.auth().signOut();
}
