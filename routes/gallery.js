const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('gallery', { current: 'gallery' });
});

module.exports = router;
