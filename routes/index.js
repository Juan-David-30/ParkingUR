var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parking Ur' });
});

router.get('/hello/:name', function(req, res, next) {
  let params = req.params
  res.send("Hello " + params['name'])
});


module.exports = router;
