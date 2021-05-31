import firebase from 'firebase';
import config from './config.js';

var firebaseConfig = {
  apiKey: config.FIREBASEAPI,
  authDomain: 'ispyify.firebaseapp.com',
  projectId: 'ispyify',
  storageBucket: 'ispyify.appspot.com',
  messagingSenderId: '273273823653',
  appId: '1:273273823653:web:596b22a9cc17ef40e4084c',
  measurementId: 'G-H24PD05K45',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
