// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKaTxama3ugogULkEOr9n4rX9ajwpBesY",
  authDomain: "stylizeme-7a7ed.firebaseapp.com",
  databaseURL:
    "https://stylizeme-7a7ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stylizeme-7a7ed",
  storageBucket: "stylizeme-7a7ed.appspot.com",
  messagingSenderId: "131981295501",
  appId: "1:131981295501:web:ae46075269939b4b9e87c4",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage };
