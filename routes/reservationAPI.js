const express = require('express');
const ReservationController = require('../src/reservation/ReservationController');

const router = express.Router();

router.post('/', ReservationController.reservation_post);
router.get('/:reservationId', ReservationController.reservation_get);

module.exports = router;
