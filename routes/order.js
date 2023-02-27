const express = require('express');

const router = express.Router();

const { getorder, getOrderById,addOrderItem,addOrder, updateOrder, deleteOrder } = require('../controllers/order');


router.route('/').get(getorder).post(addOrder)
router.route('/:id').get(getOrderById).put(updateOrder).delete(deleteOrder)


module.exports = router;