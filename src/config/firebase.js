// Import the functions you need from the SDKs you need
import { initializeApp,firebase } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZCq_maSdj4fPTmS_nalE2zj9GlP4rnao",
  authDomain: "shopme-esid.firebaseapp.com",
  projectId: "shopme-esid",
  storageBucket: "shopme-esid.appspot.com",
  messagingSenderId: "422446372665",
  appId: "1:422446372665:web:b407855334bfa97573fae8"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
export {db,auth}


// npm install -g firebase-tools