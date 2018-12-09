const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/starters', function(req, res, next) {
  res.render('menu/starters', { current: 'menu' });
});

router.get('/mains', function(req, res, next) {
  res.render('menu/mains', { current: 'menu' });
});

router.get('/sides', function(req, res, next) {
  res.render('menu/sides', { current: 'menu' });
});

router.get('/desserts', function(req, res, next) {
  res.render('menu/desserts', { current: 'menu' });
});

router.get('/drinks', function(req, res, next) {
  res.render('menu/drinks', { current: 'menu' });
});

module.exports = router;
