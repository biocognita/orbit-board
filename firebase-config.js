/* Replace null with the object in firebase-config.example.js after creating Firebase. */
window.ORBIT_FIREBASE_CONFIG = // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0VO4_QVhaJe4DAoPO-bATteegSXiGM5k",
  authDomain: "orbit-board-c4a97.firebaseapp.com",
  projectId: "orbit-board-c4a97",
  storageBucket: "orbit-board-c4a97.firebasestorage.app",
  messagingSenderId: "1095210034503",
  appId: "1:1095210034503:web:b4e74d5d8daf2e4d8ed862",
  measurementId: "G-BRHQYVX7RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);;
