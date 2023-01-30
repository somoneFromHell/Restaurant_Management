const express = require('express');
const  {getUsers,GetUserById,login,signup} = require('../controllers/user')

const router = express.Router();

router.route('/').get(getUsers)
router.route('/login/').post(login)
router.route('/signup/').post(signup)
router.route("/:id").get(GetUserById)

module.exports = router;
