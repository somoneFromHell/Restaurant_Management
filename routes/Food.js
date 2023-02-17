const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getFoodById, getFood, addFood, updateFood, deletFood } = require('../controllers/Food');



const upload = multer({dest:'public/image/food'})

router.route('/',upload.single('foodImage')).post(addFood).get(getFood)
router.route('/:id').get(getFoodById).put(updateFood).delete(deletFood)

module.exports = router;