const express = require('express');
const router = express.Router();


const {imageUpload,getFoodByMenuId, getFoodById, getFood, addFood, updateFood, deletFood } = require('../controllers/Food');


router.route('/').post(imageUpload,addFood).get(getFood)
router.route('/:id').get(getFoodById).put(updateFood).delete(deletFood)
router.route('/bymenu/:menuId').get(getFoodByMenuId)

module.exports = router;