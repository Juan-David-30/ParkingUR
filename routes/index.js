var express = require('express');
var router = express.Router();

// Import the functions you need from the SDKs you need
const { Timestamp, getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, getCountFromServer } = require( 'firebase/firestore');
const { db } = require('../DB/firebase');
const { render } = require('jade');

CUPOS = 62


// Para obtener todos los elementos de una 
async function getCollection(col)
{
  const docs = await getDocs(collection(db, col));
  let tempDoc = []
  docs.forEach((doc)=>{
    tempDoc.push( 
      { 
        id: doc.id,  
        ... doc.data(), 
        fecha: doc.data().entrada.toDate().toLocaleString()
      })
  })
  return tempDoc;
}

async function getCount(col)
{
  const coll = collection(db, col);
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count
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
      documentos: docs,
      count: await getCount('vehiculos'), 
      cupos: CUPOS
    }
  )
});

router.get('/entrada', async (req, res)=>{
  res.render('ingresar', {
    count: await getCount('vehiculos'), 
    cupos: CUPOS
  })
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



router.get('/salida', async (req, res)=>{
  const docs = await getCollection('vehiculos');
  res.render('salida', 
    {
      documentos: docs,
      count: await getCount('vehiculos'),
      cupos: CUPOS
    }
  )
});


router.post('/salida', async (req, res)=>{
  const documentref = doc(db, 'vehiculos', req.body.id);
  const document = await getDoc(documentref)
  const docRef = await addDoc(collection(db, "historial"), {
    ... document.data(),
    salida: Timestamp.fromDate(new Date())
  });
  deleteDoc(documentref)
  res.redirect('/history');
});


module.exports = router;
