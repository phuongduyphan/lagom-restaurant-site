const { Model } = require('../../config/config');

class Reservation extends Model {
  static get tableName() {
    return 'reservation';
  }

  static get idColumn() {
    return 'reservationId';
  }

  static get relationMappings() {
    const { User } = require('../user/User');
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'reservation.userId',
          to: 'user.userId'
        }
      }
    };
  }
}

module.exports = { Reservation };