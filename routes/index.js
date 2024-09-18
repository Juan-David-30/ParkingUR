var express = require('express');
var router = express.Router();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { Timestamp, getFirestore, collection, addDoc, getDocs } = require( 'firebase/firestore');
const { db } = require('../DB/firebase');


// Para obtener todos los elementos de una 
async function getCollection(col)
{
  const docs = await getDocs(collection(db, col));
  let tempDoc = []
  docs.forEach((doc)=>{
    tempDoc.push( { id: doc.id,  ... doc.data(), fecha: doc.data().entrada.toDate().toLocaleString() })
  })
  return tempDoc;
}


// Para obtener todos los elementos de una 
async function getHistory()
{
  const docs = await getDocs(collection(db, 'historial'));
  let tempDoc = []
  docs.forEach((doc)=>{
    tempDoc.push( {
       id: doc.id,  ... doc.data(), 
       fecha_entrada: doc.data().entrada.toDate().toLocaleString(),
       fecha_salida: doc.data().salida.toDate().toLocaleString()  
      })
  })
  return tempDoc;
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
});

router.get('/entrada', (req, res)=>{
  res.render('ingresar', {})
});


router.post('/entrada', async (req, res)=>{
  let tipo = true
  if(req.body.tipo == '0')
  {
    tipo = false
  }
  const docRef = await addDoc(collection(db, "vehiculos"), {
    placa: req.body.placa,
    tipo: tipo,
    entrada: Timestamp.fromDate(new Date())
  });
  res.redirect('/list');

});

router.get('/history', async (req, res)=>{
  const docs = await getHistory();
  res.render('history', 
    {
      documentos: docs
    }
  )
})


module.exports = router;
