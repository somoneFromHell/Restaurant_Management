const express = require('express');
const router  = express.Router();
const {authorize} = require('../utility/authorization')

const {getInvoice,getInvoiceById,addInvoice,updateinvoice,deleteInvoice} = require('../controllers/invoice')

router.use(authorize)

router.route('/').get(getInvoice).post(addInvoice)
router.route('/:id').get(getInvoiceById).put(updateinvoice).delete(deleteInvoice)

module.exports = router;