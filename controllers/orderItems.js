const orderItemModel = require('../models/orderItems')
const orderModel = require('../models/order')
const foodModel = require('../models/Food')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchError')


const getOrderItem = catchAsync(async(req,res,next)=>{
    const record = await orderModel.findById(req.params.orderId);
    if(!record){
        return next(new AppError('order dusent exist',400))
    }
    res.send(record.orderItems)
})

const updateOrderItem = catchAsync(async(req,res)=>{
    const order = await orderModel.findById(req.params.orderId)
    if(!order){
        return next(new AppError('order dusent exist',400))
    }
     const updateddRecord = await orderModel.findOne({_id:req.params.orderId}).then(doc=>{
        item = doc.orderItems.id(req.params.orderItemId)
        item["quantity"]=req.body.quantity;
        item["foodId"]=req.body.foodId;
        doc.save();
     })
          if(!updateddRecord){
         return next(new AppError('order Item dusent exist',400))
    }
    res.send(updateddRecord)
    
})

const deletItem  = catchAsync(async(req,res,next)=>{
    const order = await orderModel.findById(req.params.orderId)
    if(!order){
        return next(new AppError('order dusent exist',400))
    }
     const deletedRecord = await orderModel.findOneAndUpdate({_id:req.params.orderId},{$pull:{orderItems:{_id:req.params.orderItemId}}}, { safe: true, multi:false })
     if(!deletedRecord){
         return next(new AppError('order Item dusent exist',400))
    }
    res.send(deletedRecord)
})

const addOrderItem = catchAsync(async (req, res, next) => {
    const orderExist = await orderModel.findById(req.params.orderId);
    if (!orderExist) {
        return next(new AppError(`no data order with id ${req.params.orderId}`))
    }
    const foodExist = await foodModel.findById(req.body.foodId)
    if (!foodExist) {
        return next(new AppError("food does not exist"))
    }

    req.body.foodName = foodExist.food
    req.body.unitPrice = foodExist.price * req.body.quantity
    const record = await orderModel.findOneAndUpdate(req.params.orderId, { $push: { orderItems: req.body } },{ new: true, runValidators: true })
    res.send(record)
    console.log(record)
})


module.exports = {updateOrderItem,addOrderItem,getOrderItem,deletItem}