//import { initializeApp } from "firebase/app";
//import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/auth';  // Import other Firebase modules as needed


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz1pQAjtEc63Edhxte1gdzVTl0j0UDsSI",
  authDomain: "dsl-rep-tracker.firebaseapp.com",
  projectId: "dsl-rep-tracker",
  storageBucket: "dsl-rep-tracker.appspot.com",
  messagingSenderId: "31741801014",
  appId: "1:31741801014:web:5ba88426ccf70d06ef9e97",
  measurementId: "G-E6PM9J59EV"
};
/*
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, updateDoc, doc };

*/
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;