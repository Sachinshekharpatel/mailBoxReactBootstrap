// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // Your Firebase configuration details
  apiKey: 'AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0',
  authDomain: 'your-auth-domain',
  projectId: 'fir-cypresstestcase',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;