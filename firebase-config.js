/*
  Orbit Board Firebase configuration.

  This file is loaded as a plain script (not a module) by productivity-board.html
  and simply exposes the Firebase Web App config on window. Keep these values in
  sync with Firebase Console > Project settings.

  The apiKey is not a secret: it identifies the app to Firebase. Data is protected
  by Firebase Authentication (Email/Password) and the Firestore security rules in
  firestore.rules, which restrict every user to their own /users/{uid}/tasks data.
*/
window.ORBIT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC0VO4_QVhaJe4DAoPO-bATteegSXiGM5k",
  authDomain: "orbit-board-c4a97.firebaseapp.com",
  projectId: "orbit-board-c4a97",
  storageBucket: "orbit-board-c4a97.firebasestorage.app",
  messagingSenderId: "1095210034503",
  appId: "1:1095210034503:web:b4e74d5d8daf2e4d8ed862",
  measurementId: "G-BRHQYVX7RQ"
};
