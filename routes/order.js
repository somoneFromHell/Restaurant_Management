const express = require('express');

const router = express.Router();

const { getorder, getOrderById,deleteOrderbyTableId,getOrderbyTableId,addOrder, updateOrder, deleteOrder } = require('../controllers/order');


router.route('/').get(getorder).post(addOrder)
router.route('/:id').get(getOrderById).put(updateOrder).delete(deleteOrder)
router.route('/tableStatus/:TableId').delete(deleteOrderbyTableId).get(getOrderbyTableId)


module.exports = router;