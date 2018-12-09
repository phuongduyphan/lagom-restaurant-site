const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reservation', { current: 'reservation' });
});

module.exports = router;
