var express = require('express');
var router = express.Router();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require( 'firebase/firestore');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS4cPjJeAN-l9pr9xqf7khZm0QwshndZs",
  authDomain: "parking-ur.firebaseapp.com",
  projectId: "parking-ur",
  storageBucket: "parking-ur.appspot.com",
  messagingSenderId: "237670195895",
  appId: "1:237670195895:web:609ed59eb4b0b6897c2332",
  measurementId: "G-SHSL5X6NCP"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Ur' });
  /*db.collection('vehiculos').doc('mHpIJIvZHbvZRdB3AkoF').set({
      placa: 'asdgjhfasdf',
      type: True
  });*/
});


router.post('/ingresar', (req, res)=>{
  /*db.collection('vehiculos').add({
    placa: req.body.post.placa,
    type: req.body.post.tipo
  })
  .then(docRef => {
    console.log('Document written with ID:', docRef.id);
  })
  .catch(error => {
    console.error('Error adding document:', error);
  });*/
  res.render('ingresado', {
    placa: req.body.placa,
    type: req.body.tipo
  });
})


module.exports = router;
