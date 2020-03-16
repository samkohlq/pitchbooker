import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDDzEsr55wxwuwlUPJ6kdIJnrqVXj698Y",
  authDomain: "pitch-booker.firebaseapp.com",
  databaseURL: "https://pitch-booker.firebaseio.com",
  projectId: "pitch-booker",
  storageBucket: "pitch-booker.appspot.com",
  messagingSenderId: "373850113183",
  appId: "1:373850113183:web:9cdc36b686c0cc53478eaa",
  measurementId: "G-P692PWPJC6"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
