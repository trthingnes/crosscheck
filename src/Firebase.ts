import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "crosscheck-51e67.firebaseapp.com",
  projectId: "crosscheck-51e67",
  storageBucket: "crosscheck-51e67.appspot.com",
  messagingSenderId: "345420827776",
  appId: "1:345420827776:web:2482e31abe09700a4eaa65",
  measurementId: "G-NHPF5E1SRL"
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