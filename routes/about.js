const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { current: 'about' });
});

module.exports = router;
