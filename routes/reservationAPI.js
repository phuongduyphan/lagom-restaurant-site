const express = require('express');
const ReservationController = require('../src/reservation/ReservationController');

const router = express.Router();

router.get('/status/pending', ReservationController.reservation_pending_get);
router.get('/status/confirmed', ReservationController.reservation_confirmed_get);
router.get('/status/declined', ReservationController.reservation_declined_get);
router.post('/', ReservationController.reservation_post);
router.get('/:reservationId', ReservationController.reservation_get);
router.put('/:reservationId/status', ReservationController.reservation_status_put);

module.exports = router;
