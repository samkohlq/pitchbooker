import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg8bOKfQDEDSjvcPd1b1WJvv_t5mij0fE",
  authDomain: "pitchbooker-6c632.firebaseapp.com",
  databaseURL: "https://pitchbooker-6c632.firebaseio.com",
  projectId: "pitchbooker-6c632",
  storageBucket: "pitchbooker-6c632.appspot.com",
  messagingSenderId: "80970569924",
  appId: "1:80970569924:web:930f02960d5e49a77a1191",
  measurementId: "G-DGCF4M4RJ8"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
