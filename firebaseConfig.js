import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

// Initialize Firebase Firestore
const db = getFirestore(app);

// Initialize Firebase Auth with React Native AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export the necessary components
export { auth, db, app };
