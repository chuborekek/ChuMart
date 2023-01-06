// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chumart-7e764.firebaseapp.com",
  projectId: "chumart-7e764",
  storageBucket: "chumart-7e764.appspot.com",
  messagingSenderId: "462790288607",
  appId: "1:462790288607:web:b65f66ed83fa0c7ac0756a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app);
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;