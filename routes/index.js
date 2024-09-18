var express = require('express');
var router = express.Router();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs } = require( 'firebase/firestore');
const { db } = require('../DB/firebase');


// Para obtener todos los elementos de una 
async function getCollection(col)
{
  const docs = await getDocs(collection(db, col));
  let tempDoc = []
  docs.forEach((doc)=>{
    tempDoc.push( { id: doc.id,  ... doc.data()})
  })
  return tempDoc
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Ur' });
});

router.get('/list', async (req, res)=>{
  const docs = await getCollection('vehiculos');
  res.render('list', 
    {
      documentos: docs
    }
  )
})

router.get('/entrada', (req, res)=>{
  res.render('ingresar', {})
})


router.post('/entrada', async (req, res)=>{
  let tipo = true
  if(req.body.tipo == '0')
  {
    tipo = false
  }
  const docRef = await addDoc(collection(db, "vehiculos"), {
    placa: req.body.placa,
    tipo: tipo
  });
  res.redirect('/list')

})


module.exports = router;
