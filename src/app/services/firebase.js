import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA7ZzyZDgWGdCDoWCnN03Z8aQTa591T_zo",
    authDomain: "mood-af33d.firebaseapp.com",
    projectId: "mood-af33d",
    storageBucket: "mood-af33d.appspot.com",
    messagingSenderId: "906739744544",
    appId: "1:906739744544:web:5ab3c5b795fb2db0e0a145"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };