const express = require('express');
const { getOrderItem, addOrderItem, getOrderItemById, updateItem, deletItem } = require('../controllers/orderItems');
const router = express.Router();

router.route('/').get(getOrderItem).post(addOrderItem)
router.route('/:id').get(getOrderItemById).put(updateItem).delete(deletItem)

module.exports = router;