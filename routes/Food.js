const express = require('express');
const router = express.Router();
const { getFoodById, getFood, addFood, updateFood, deletFood } = require('../controllers/Food');
const {authorize} = require('../utility/authorization')


router.use(authorize)
router.route('/').get(getFood).post(addFood)
router.route('/:id').get(getFoodById).put(updateFood).delete(deletFood)

module.exports = router;