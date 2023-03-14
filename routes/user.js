const express = require('express');
const  {getUsers,getUserbyEmail,UpdateUserbyEmail,login,signup} = require('../controllers/user')

const router = express.Router();

router.route('/').get(getUsers)
router.route('/login/').post(login)
router.route('/signup/').post(signup)
router.route("/:id").get(getUserbyEmail).put(UpdateUserbyEmail)

module.exports = router;
