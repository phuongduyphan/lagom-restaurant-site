const express = require('express');
const router = express.Router();
const { Dish } = require('../models/dish/Dish');

/* GET home page. */
router.get('/starters', async function (req, res, next) {
  try {
    const listOfDishes = await Dish.query().where({
      dishStatus: 'available',
      dishCategory: 'starter'
    });
    res.render('menu/starters',
      {
        current: 'menu',
        listOfDishes
      });
  } catch (err) {
    next(err);
  }
});

router.get('/mains', async function (req, res, next) {
  try {
    const listOfDishes = await Dish.query().where({
      dishStatus: 'available',
      dishCategory: 'main'
    });
    res.render('menu/mains',
      {
        current: 'menu',
        listOfDishes
      });
  } catch (err) {
    next(err);
  }
});

router.get('/sides', async function (req, res, next) {
  try {
    const listOfDishes = await Dish.query().where({
      dishStatus: 'available',
      dishCategory: 'side'
    });
    res.render('menu/sides',
      {
        current: 'menu',
        listOfDishes
      });
  } catch (err) {
    next(err);
  }
});

router.get('/desserts', async function (req, res, next) {
  try {
    const listOfDishes = await Dish.query().where({
      dishStatus: 'available',
      dishCategory: 'dessert'
    });
    res.render('menu/desserts',
      {
        current: 'menu',
        listOfDishes
      });
  } catch (err) {
    next(err);
  }
});

router.get('/drinks', async function (req, res, next) {
  try {
    const listOfDishes = await Dish.query().where({
      dishStatus: 'available',
      dishCategory: 'drink'
    });
    res.render('menu/drinks',
      {
        current: 'menu',
        listOfDishes
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
