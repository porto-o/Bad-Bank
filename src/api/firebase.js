// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUvZjh6ndeiJObNMnYh60eJGs-9QTPl_4",
  authDomain: "bad-bank-fac26.firebaseapp.com",
  projectId: "bad-bank-fac26",
  storageBucket: "bad-bank-fac26.appspot.com",
  messagingSenderId: "322005009262",
  appId: "1:322005009262:web:bb294cc5fc6b981c3ff77f",
  measurementId: "G-P44BD1KRG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };
