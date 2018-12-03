const db = require('../../config/mysql-config');
const queryStatement = require('./ReservationSqlStatements');

module.exports = {
  async reservation_pending_get(req, res) {
    try {
      const connection = await db.getConnection();
      const result = await connection.query(queryStatement.selectPendingReservationWithUser);
      const userInfo = db.getAPIObject(result[0], db.category.user);
      const reservationInfo = db.getAPIObject(result[0], db.category.reservation);
      res.send({
        userInfo,
        reservationInfo
      });
    } catch (err) {
       throw err;
    }
  },

  async reservation_confirmed_get(req, res) {
    try {
      const connection = await db.getConnection();
      const result = await connection.query(queryStatement.selectConfirmedReservationWithUser);
      res.send(result);
    } catch (err) {
       throw err;
    }
  },

  async reservation_declined_get(req, res) {
    try {
      const connection = await db.getConnection();
      const result = await connection.query(queryStatement.selectDeclinedReservationWithUser);
      res.send(result);
    } catch (err) {
       throw err;
    }
  },

  async reservation_post(req, res) {
    let { reservation } = req.body;
    try {
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();
        const userDb = db.getDbObject(reservation, db.category.user);
        const resultUserQuery = await connection.query(queryStatement.insertQuery, [db.schema.user, userDb]);
        const userId = resultUserQuery.insertId;
        reservation = Object.assign(reservation, { userId });
        const reservationDb = db.getDbObject(reservation, db.category.reservation);
        await connection.query(queryStatement.insertQuery, [db.schema.reservation, reservationDb]);
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
  async reservation_get(req, res) {
    let { reservationId } = req.params;
    try {
      const connection = await db.getConnection();
      const reservationUserInfoPacket = await connection.query(queryStatement.selectReservationWithUser, reservationId);
      
      const reservationUserInfoDb = (JSON.parse(JSON.stringify(reservationUserInfoPacket)))[0];
      
      const userInfo = db.getAPIObject(reservationUserInfoDb, db.category.user);
      const reservationInfo = db.getAPIObject(reservationUserInfoDb, db.category.reservation);

      const returnedData = {
        userInfo,
        reservationInfo
      };
      res.send(returnedData);
    } catch (err) {
      throw err;
    }
  },
  async reservation_status_put(req, res) {
    const { reservationId } = req.params;
    const { reservation } = req.body;
    try {
      const connection = await db.getConnection();
      const reservationDb = db.getDbObject(reservation, db.category.reservation);
      await connection.query(queryStatement.updateReservationStatus, [reservationDb, reservationId]);
      res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
}