const express = require('express');
const { getOrderItem, addOrderItem, deletItem, updateOrderItem } = require('../controllers/orderItems');
const router = express.Router();

router.route('/:orderId').get(getOrderItem)
router.route('/add/:orderId').post(addOrderItem)
router.route('/:orderId/:orderItemId').delete(deletItem).put(updateOrderItem)

module.exports = router;