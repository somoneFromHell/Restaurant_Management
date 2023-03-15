const express = require('express');
const  {getUsers,getUserbyEmail,userImageUpload,UpdateUserbyEmail,login,signup} = require('../controllers/user')

const router = express.Router();

router.route('/').get(getUsers)
router.route('/login/').post(login)
router.route('/signup/').post(signup)
router.route("/:id").get(getUserbyEmail).put(userImageUpload,UpdateUserbyEmail)

module.exports = router;
