import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKaTxama3ugogULkEOr9n4rX9ajwpBesY",
  authDomain: "stylizeme-7a7ed.firebaseapp.com",
  databaseURL:
    "https://stylizeme-7a7ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stylizeme-7a7ed",
  storageBucket: "stylizeme-7a7ed.appspot.com",
  messagingSenderId: "131981295501",
  appId: "1:131981295501:web:ae46075269939b4b9e87c4",

  /*
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  */
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
