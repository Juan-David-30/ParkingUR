var express = require('express');
var router = express.Router();

// Para validar formularios
const { body, validationResult } = require("express-validator");

// Import the functions you need from the SDKs you need
const { Timestamp, getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, getCountFromServer, query, where } = require( 'firebase/firestore');
const { db } = require('../DB/firebase');
const { render } = require('jade');

CUPOS = [7,7,7,7,7]


// Para obtener todos los elementos de una colección
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

// Función que retorna la cuenta de vehiculos en cada piso
async function getCount(col)
{
  // Reference to the 'vehiculos' collection
  const docs = await getDocs(collection(db,col));
  let pisoCount = {}
  docs.forEach((doc)=>{
    const piso = doc.data().piso;
    // If the piso exists, increment the count, otherwise initialize it
    if (pisoCount[piso - 1]) {
        pisoCount[piso - 1]++;
    } else {
        pisoCount[piso - 1] = 1;
    }
  })

  for (let i = 0; i < CUPOS.length; i++){
    if(!pisoCount[i])
    {
      pisoCount[i] = 0;
    }
  }

  return pisoCount
}


// Para obtener todos los elementos del historial
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


/**
 * 
 * End points
 * 
 */


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


router.post('/entrada', [
  [
    body("owner").notEmpty(),
    body("floor").notEmpty(),
    body("color").notEmpty(),
    body("placa").notEmpty(),
  ],
],
 async (req, res)=>{

  const errors = validationResult(req);
  
  console.log(req.body.owner)

  if (!errors.isEmpty()) {
    return res.status(400).render('ingresar', {
      count: await getCount('vehiculos'), 
      cupos: CUPOS,
      errors: "Datos incorrectos",
      form: req.body
    });
  }

  if ((await getCount('vehiculos'))[req.body.floor - 1] >= CUPOS[req.body.floor - 1]){
      return res.status(400).render('ingresar', {
      count: await getCount('vehiculos'), 
      cupos: CUPOS,
      errors: "Cupos insuficientes en piso seleccionado",
      form: req.body
    });
  }

  const q = query(collection(db, 'vehiculos'), where('placa', '==' , req.body.placa));
  const snapshot = await getCountFromServer(q);

  if(snapshot.data().count >= 1){
    return res.status(400).render('ingresar', {
      count: await getCount('vehiculos'), 
      cupos: CUPOS,
      errors: "Ya se encuentra ingresado un vehiculo con esa placa",
      form: req.body
    });
  }

  let tipo = true
  if(req.body.tipo == 'Moto')
  {
    tipo = false
  }


  const docRef = await addDoc(collection(db, "vehiculos"), {
    placa: req.body.placa.toUpperCase().replace(/\s/g, ''),
    tipo: tipo,
    piso: req.body.floor,
    owner: req.body.owner, 
    color: req.body.color, 
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
