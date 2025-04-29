// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxX5f3E3X_FMDA5vzfOYJg6tqcwh1hPZY",
  authDomain: "webkelas-12.firebaseapp.com",
  databaseURL: "https://webkelas-12-default-rtdb.firebaseio.com",
  projectId: "webkelas-12",
  storageBucket: "webkelas-12.firebasestorage.app",
  messagingSenderId: "101766651998",
  appId: "1:101766651998:web:094a02b3d4fb212cf154cf",
  measurementId: "G-BBGQ5CFZBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
