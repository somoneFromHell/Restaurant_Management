const express = require('express');
const router = express.Router();
const { getFoodById, getFood, addFood, updateFood, deletFood } = require('../controllers/Food');

router.route('/').get(getFood).post(addFood)
router.route('/:id').get(getFoodById).put(updateFood).delete(deletFood)

module.exports = router;