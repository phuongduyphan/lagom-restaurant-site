const db = require('../../config/mysql-config');
const queryStatement = require('./ReservationSqlStatements');

module.exports = {
  async reservation_post(req, res) {
    let { reservation } = req.body;
    try {
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();
        const userDb = db.getDbObject(reservation, db.category.user);
        const resultUserQuery = await connection.query(queryStatement.insertQuery, ['user', userDb]);
        const userId = resultUserQuery.insertId;
        reservation = Object.assign(reservation, { userId });
        const reservationDb = db.getDbObject(reservation, db.category.reservation);
        await connection.query(queryStatement.insertQuery, ['reservation', reservationDb]);
        await connection.commit();
        res.sendStatus(200);
      } catch (err) {
        await connection.rollback();
        throw err;
      }
    } catch (err) {
      throw err;
    }
  },
}