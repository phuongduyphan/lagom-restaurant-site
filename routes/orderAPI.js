const express = require('express');
const OrderController = require('../src/order/OrderController');

const router = express.Router();

router.post('/', OrderController.order_post);
router.get('/:orderId', OrderController.order_get);

module.exports = router;
