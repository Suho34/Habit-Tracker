import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3L5k8RXfJ5bF9DTHU_ugbaIbEhjMH9Ts",
  authDomain: "habit-tracker-a9d8d.firebaseapp.com",
  projectId: "habit-tracker-a9d8d",
  storageBucket: "habit-tracker-a9d8d.firebasestorage.app",
  messagingSenderId: "528292644732",
  appId: "1:528292644732:web:0f11d1e51fa8cac75c06f9",
  measurementId: "G-RK6NQV89B7",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  googleProvider,
};
