const express = require('express');
const router = express.Router();

router.get('/login', async function (req, res, next) {
  try {
    res.render('admin/login', { current: 'Log In' });
  } catch (err) {
    next(err);
  }
});

router.get('/register', async function (req, res, next) {
  try {
    res.render('admin/register', { current: 'Sign Up' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;