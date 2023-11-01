import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

//collection ref
const postsColl = collection( db, 'post');
const usersColl = collection( db, 'Users');
const referencesColl = collection( db, 'References');

//get collection docs
getDocs(postsColl).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
  });
});

getDocs(usersColl).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
  });
});

getDocs(referencesColl).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
  });
});

export default db