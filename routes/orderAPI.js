const express = require('express');
const OrderController = require('../src/order/OrderController');

const router = express.Router();

router.post('/', OrderController.order_post);

module.exports = router;
