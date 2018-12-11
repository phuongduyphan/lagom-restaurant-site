const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('manage/options');
});

router.get('/addDish', function (req, res, next) {
  res.render('manage/addDish');
});

router.get('/dish/edit/:dishId', function (req, res, next) {
  res.render('manage/dish/edit/edit');
});

router.get('/dish/starters', async function (req, res, next) {
  try {
    res.render('manage/dish/starters');
  } catch (err) {
    throw err;
  }
});

router.get('/dish/mains', async function (req, res, next) {
  try {
    res.render('manage/dish/mains');
  } catch (err) {
    throw err;
  }
});

router.get('/dish/sides', async function (req, res, next) {
  try {
    res.render('manage/dish/sides');
  } catch (err) {
    throw err;
  }
});

router.get('/dish/desserts', async function (req, res, next) {
  try {
    res.render('manage/dish/desserts');
  } catch (err) {
    throw err;
  }
});

router.get('/dish/drinks', async function (req, res, next) {
  try {
    res.render('manage/dish/drinks');
  } catch (err) {
    throw err;
  }
});

router.get('/reservation', async function (req, res, next) {
  try {
    res.render('manage/reservation/reservation');
  } catch (err) {
    next(err);
  }
});

router.get('/reservation/:reservationId', async function (req, res, next) {
  try {
    res.render('manage/reservation/reservationDetail');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
