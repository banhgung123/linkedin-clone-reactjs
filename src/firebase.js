import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  onSnapshot
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDzUXvi8j3rqNRq_bVF8vQXuv1ks7PW4H4",
  authDomain: "linkedin-clone-reactjs-f07c4.firebaseapp.com",
  projectId: "linkedin-clone-reactjs-f07c4",
  storageBucket: "linkedin-clone-reactjs-f07c4.appspot.com",
  messagingSenderId: "635882750619",
  appId: "1:635882750619:web:683ccbdbe51dd6110efc3e"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export {
  db,
  auth,
  getAuth,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  doc,
  onSnapshot
};
