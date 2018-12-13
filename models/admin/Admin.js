const { Model } = require('../../config/config');

class Admin extends Model {
  static get tableName() {
    return 'admin';
  }

  static get idColumn() {
    return 'adminId';
  }
}

module.exports = { Admin };