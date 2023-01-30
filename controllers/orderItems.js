const orderItemModel = require('../models/orderItems')
const orderModel = require('../models/order')
const foodModel = require('../models/Food')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchError')


const getOrderItem = catchAsync(async(req,res)=>{
    const records = await orderItemModel.find()
    res.send(records)
})

const getOrderItemById = catchAsync(async (req,res)=>{
    const record = await orderItemModel.findById(req.params.id)
    if(!record){
        return next(new AppError("orderItemId"+req.params.id+"not exist",400))
    }
    res.send(record)
})

const addOrderItem =catchAsync(async(req,res,next)=>{
    const foodIdExist = await foodModel.findById(req.body.foodId).select("_id").lean();
    if(!foodIdExist){
        return next(new AppError(`food item with id ${req.body.foodId} dos not exist`))
    }

    const oderIdExist = await orderModel.findOne({_id:req.body.orderId}).select("_id").lean();
    if(!oderIdExist){
        return next(new AppError(`order with id ${req.body.orderId} does not exists`))
    }
    const record = await orderItemModel.create(req.body)

    res.send(record)
})

const updateItem = catchAsync(async(req,res,next)=>{

    const foodIdExist = await foodModel.findById(req.body.foodId).select("_id").lean();
    if(!foodIdExist){
        return next(new AppError(`food item with id ${req.body.foodId} dos not exist`))
    }

    const oderIdExist = await orderModel.findOne({_id:req.body.orderId}).select("_id").lean();
    if(!oderIdExist){
        return next(new AppError(`order with id ${req.body.orderId} does not exists`))
    }
    const updatedRecord = await orderItemModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!updatedRecord){
        return next(new AppError('no data with given orderItemid'),400)
    }
    res.send(updatedRecord)
})

const deletItem  = catchAsync(async(req,res)=>{
    const deletedRecord = await orderItemModel.findByIdAndDelete(req.params.id)
    res.send(deletedRecord)
})

module.exports = {getOrderItem,getOrderItem,addOrderItem,updateItem,deletItem,getOrderItemById}