const { Model } = require('../../config/config');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'userId';
  }

  static get relationMappings() {
    const { Reservation } = require('../reservation/Reservation');
    return {
      reservations: {
        relation: Model.HasManyRelation,
        modelClass: Reservation,
        join: {
          from :'user.userId',
          to: 'reservation.userId'
        }
      }
    };
  }
}

module.exports = { User };