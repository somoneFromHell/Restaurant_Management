const express = require('express');
const { getTable, getTableById,patchTableStatus, addTable, updateTable, deletTable } = require('../controllers/table');

const router = express.Router();

router.route('/').get(getTable).post(addTable)
router.route('/:id').get(getTableById).put(updateTable).delete(deletTable)
router.route('/tableStatus/:id').patch(patchTableStatus)
module.exports = router;