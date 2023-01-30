const express = require('express');
const router = express.Router();

const { GetAllMenu,
    GetMenuById,
    PostMenu,
    UpdateMenu,
    DeletMenu } = require('../controllers/menu')


router.route('/').get(GetAllMenu).post(PostMenu)
router.route('/:id').get(GetMenuById).put(UpdateMenu).delete(DeletMenu)


module.exports = router;




