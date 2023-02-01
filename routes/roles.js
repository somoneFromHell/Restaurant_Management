const express = require('express');
const {getRoles,addRoles} = require('../controllers/roles')
const router = express.Router()

router.route('/').get(getRoles).post(addRoles)

module.exports = router;