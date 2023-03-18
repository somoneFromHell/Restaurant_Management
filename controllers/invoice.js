const invoiceModel = require('../models/invoice')
const orderModel = require('../models/order')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchError')

const getInvoice = catchAsync(async (req, res) => {
    const records = await invoiceModel.find({})
    if (!records) {
        return next(new AppError('empty...'))
    }
    res.send(records)
})

const getInvoiceById = catchAsync(async(req,res)=>{
    const record = await invoiceModel.findById(req.params.id)
    if (!record) {
        return next(new AppError('no Data with id'+req.params.id,404))
    }
    res.send(record)
})

const addInvoice = catchAsync(async (req,res,next)=>{

    const record = await invoiceModel.create(req.body)
    console.log(req.body)
    res.send({Success:true,Message:"invoice saved successfully",Data:record})
    
})

const updateinvoice = catchAsync(async(req,res,next)=>{

    updatedRecord = await invoiceModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!updatedRecord){
        return next(new AppError("no data with this id",404))
    }
    res.send(updatedRecord)
    
})

const deleteInvoice = catchAsync(async(req,res,next)=>{
    deletedRecord = await invoiceModel.findByIdAndDelete(req.params.id)
    if(!deletedRecord){
        return next(new AppError("no data with this id",404))
    }
    res.send(deletedRecord)
})


module.exports = {getInvoice,getInvoiceById,addInvoice,updateinvoice,deleteInvoice}