const express = require('express');
const OrderController = require('../src/order/OrderController');

const router = express.Router();

router.get('/status/pending', OrderController.order_pending_get);
router.get('/status/confirmed', OrderController.order_confirmed_get);
router.get('/status/delivered', OrderController.order_delivered_get);
router.post('/', OrderController.order_post);
router.get('/:orderId', OrderController.orderId_get);
router.put('/:orderId/status', OrderController.order_status_put);

module.exports = router;
