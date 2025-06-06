// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET, 
  messagingSenderId: process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID, 
  appId: process.env.FIREBASE_CLIENT_APP_ID, 
  measurementId: process.env.FIREBASE_CLIENT_MEASUREMENT_ID 
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
