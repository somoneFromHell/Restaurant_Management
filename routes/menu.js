const express = require('express');
const router = express.Router();
const {authorize} = require('../utility/authorization')


const { GetAllMenu,
    GetMenuById,
    PostMenu,
    UpdateMenu,
    DeletMenu } = require('../controllers/menu')

    router.use(authorize)

router.route('/').get(GetAllMenu).post(PostMenu)
router.route('/:id').get(GetMenuById).put(UpdateMenu).delete(DeletMenu)


module.exports = router;




