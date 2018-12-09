const { Model } = require('../../config/config');

class Dish extends Model {
  static get tableName() {
    return 'dish';
  }

  static get idColumn() {
    return 'dishId';
  }
}

module.exports = { Dish };