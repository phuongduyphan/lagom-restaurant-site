const express = require('express');
const { transaction } = require('objection');
const moment = require('moment');

const { Reservation } = require('../models/reservation/Reservation');
const { User } = require('../models/user/User');

const router = express.Router();

router.get('/alls/:reservationId', async (req, res, next) => {
  try {
    const { reservationId } = req.params;
    const reservations = await Reservation.query().eager('users').where({ reservationId });
    reservations.forEach((element) => {
      element.arrivalDate = moment(element.arrivalDate).format('YYYY-MM-DD');
      element.arrivalTime = moment(element.arrivalTime, 'HH:mm:ss').format('HH:mm');
    });
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { reservation } = req.body;
    console.log(reservation);
    await transaction(Reservation.knex(), async (trx) => {
      const user = await User.query(trx).insertAndFetch(reservation.users);
      reservation.userId = user.userId;
      await Reservation.query(trx).insert(reservation);
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put('/:reservationId', async(req, res, next) => {
  try {
    const { reservation } = req.body;
    const { reservationId } = req.params;
    await Reservation.query().patch(reservation).where({ reservationId });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.get('/pending', async (req, res, next) => {
  try {
    let { arrivalDate } = req.query;
    let reservation = { 
      status: 'pending'
    };
    if (arrivalDate) {
      arrivalDate = moment(arrivalDate).format('YYYY-MM-DD');
      reservation = Object.assign(reservation, { arrivalDate });
    }

    const reservations = await Reservation.query().eager('users').where(reservation).orderBy('reservationId', 'desc');
    reservations.forEach((element) => {
      element.arrivalDate = moment(element.arrivalDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
      element.arrivalTime = moment(element.arrivalTime, 'HH:mm:ss').format('HH:mm');
    });
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

router.get('/confirmed', async (req, res, next) => {
  try {
    let { arrivalDate } = req.query;
    let reservation = { 
      status: 'confirmed'
    };
    if (arrivalDate) {
      arrivalDate = moment(arrivalDate).format('YYYY-MM-DD');
      reservation = Object.assign(reservation, { arrivalDate });
    }

    const reservations = await Reservation.query().eager('users').where(reservation).orderBy('reservationId', 'desc');
    reservations.forEach((element) => {
      element.arrivalDate = moment(element.arrivalDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
      element.arrivalTime = moment(element.arrivalTime, 'HH:mm:ss').format('HH:mm');
    });
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

router.get('/declined', async (req, res, next) => {
  try {
    let { arrivalDate } = req.query;
    let reservation = { 
      status: 'declined'
    };
    if (arrivalDate) {
      arrivalDate = moment(arrivalDate).format('YYYY-MM-DD');
      reservation = Object.assign(reservation, { arrivalDate });
    }

    const reservations = await Reservation.query().eager('users').where(reservation).orderBy('reservationId', 'desc');
    reservations.forEach((element) => {
      element.arrivalDate = moment(element.arrivalDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
      element.arrivalTime = moment(element.arrivalTime, 'HH:mm:ss').format('HH:mm');
    });
    res.send(reservations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
