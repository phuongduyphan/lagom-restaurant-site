const express = require('express');

const { Dish } = require('../models/dish/Dish');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let dish;

    if (status) {
      dish = await Dish.query().where({ dishStatus: status });
    }
    else {
      dish = await Dish.query();
    }
    res.send(dish);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { dish } = req.body;
    await Dish.query().insert(dish);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.get('/:dishId', async (req, res, next) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.query().where({ dishId });
    res.send(dish);
  } catch (err) {
    next(err);
  }
});

router.put('/:dishId', async (req, res, next) => {
  try {
    const { dish } = req.body;
    const { dishId } = req.params; 

    await Dish.query().patch(dish).where({ dishId: dishId });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
