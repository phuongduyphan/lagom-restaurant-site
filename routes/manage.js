const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/dish', function(req, res, next) {
  res.render('manage/dish');
});

router.get('/addDish', function(req, res, next) {
  res.render('manage/addDish');
});

module.exports = router;
