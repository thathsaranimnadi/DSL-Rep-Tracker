import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz1pQAjtEc63Edhxte1gdzVTl0j0UDsSI",
  authDomain: "dsl-rep-tracker.firebaseapp.com",
  projectId: "dsl-rep-tracker",
  storageBucket: "dsl-rep-tracker.appspot.com",
  messagingSenderId: "31741801014",
  appId: "1:31741801014:web:e6d83bf3f4d5af71ef9e97",
  measurementId: "G-PK45TTQYPC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);






//export default firebase;
export { auth, db };