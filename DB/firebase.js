// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require( "firebase/analytics");
const { getFirestore, collection, getDocs } = require('firebase/firestore')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgi3eDP-dTiECa4Etq_nOafPGv6Kf9yeQ",
  authDomain: "parking-ur-405c7.firebaseapp.com",
  projectId: "parking-ur-405c7",
  storageBucket: "parking-ur-405c7.appspot.com",
  messagingSenderId: "141933599901",
  appId: "1:141933599901:web:4f20d3032caa5c19d30874",
  measurementId: "G-DZ3Y4LPL8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
//const analytics = getAnalytics(app)

module.exports = { app, db }