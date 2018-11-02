const db = require('../../config/mysql-config');
const queryStatement = require('./DishSqlStatements');

module.exports = {
  async dish_get(req, res) {
    try {
      const connection = await db.getConnection();
      const dishInfoPacket = await connection.query(queryStatement.selectAllDishes);
      const listOfDishesDb = JSON.parse(JSON.stringify(dishInfoPacket));
      let listOfDishes = [];
      listOfDishesDb.forEach(element => {
        listOfDishes.push(db.getAPIObject(element, db.category.dish));
      });
      res.send(listOfDishes);
    } catch (err) {
      throw err;
    }
  },
  async dish_post(req, res) {
    let { dish } = req.body;
    const dishImagePath = `./public/images/dishes/${req.file.filename}`;
    dish = Object.assign(dish, { dishImagePath });
    try {
      const connection = await db.getConnection();
      const dishDb = db.getDbObject(dish, db.category.dish);
      await connection.query(queryStatement.insertQuery, [db.schema.dish, dishDb]);
      res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
  async dish_put(req, res) {
    let { dish } = req.body;
    if (req.file) {
      const dishImagePath = `./public/images/dishes/${req.file.filename}`;
      dish = Object.assign(dish, { dishImagePath });
    }
    const { dishId } = req.params;
    try {
      const connection = await db.getConnection();
      const dishDb = db.getDbObject(dish, db.category.dish);
      await connection.query(queryStatement.updateDish, [dishDb, dishId]);
      res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
};