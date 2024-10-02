// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0O1u-bV1rniKj3_zTv1Kgntcujk9p5E4",
  authDomain: "trinite-28953.firebaseapp.com",
  projectId: "trinite-28953",
  storageBucket: "trinite-28953.appspot.com",
  messagingSenderId: "265477610721",
  appId: "1:265477610721:web:7f167b582ffb6a89f36ba0",
  measurementId: "G-RTXBZVYF0G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    console.log(user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export { auth, db, storage };
