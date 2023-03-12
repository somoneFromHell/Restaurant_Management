const orderItemModel = require('../models/orderItems')
const orderModel = require('../models/order')
const foodModel = require('../models/Food')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchError')



const getOrderItem = catchAsync(async (req, res, next) => {
    const record = await orderModel.findOne({ TableId: req.params.orderId });
    if (!record) {
        return next(new AppError('order dusent exist', 400))
    }
    res.send(record.orderItems)
})

const updateOrderItem = catchAsync(async (req, res, next) => {
    const order = await orderModel.findOne({ TableId: req.params.orderId, invoiceGenrated: false })
    if (!order) {
        return next(new AppError('order dusent exist', 400))
    }
    let orderItem = order.orderItems.id(req.params.orderItemId)
    if (!orderItem) {
        return next(new AppError('order Item dusent exist', 400))
    }
    const foodExist = await foodModel.findById(req.body.foodId)
    if (!foodExist) {
        return next(new AppError("food does not exist", 400))
    }

    orderItem.foodId = req.body.foodId
    orderItem.menuId = foodExist.menuId
    orderItem.quantity = req.body.quantity
    orderItem.foodName = foodExist.food
    orderItem.unitPrice = req.body.quantity * foodExist.price
    const updated = await order.save()
    res.send(orderItem)

})

const deletItem = catchAsync(async (req, res, next) => {
    const order = await orderModel.findOne({ TableId: req.params.orderId, invoiceGenrated: false })
    if (!order) {
        return next(new AppError('order dusent exist', 400))
    }
    const orderItem = order.orderItems.id(req.params.orderItemId)
    if (!orderItem) {
        return next(new AppError('order Item dusent exist', 400))

    }
    orderItem.remove();
    order.save();
    res.send(order)
})

const addOrderItem = catchAsync(async (req, res, next) => {

    
    const orderExist = await orderModel.findOne({ TableId: req.params.orderId });
    if (!orderExist) {
        return next(new AppError(`no data order with id ${req.params.orderId}`))
    }
    
    const foodExist = await foodModel.findOne({_id:req.body.foodId})
    console.log(req.body)
    if (!foodExist) {
        return next(new AppError("food does not exist"))
    }

    var orderItemInOrder = orderExist.orderItems.filter(i => i.foodId.toHexString() === req.body.foodId)



    if (orderItemInOrder.length > 0) {

        orderItemInOrder[0].quantity += req.body.quantity
        orderItemInOrder[0].unitPrice = orderItemInOrder.quantity * foodExist.price
        const updated = await orderExist.save()
        res.send(updated)
        

    } else {
        req.body.foodName = foodExist.food
        req.body.menuId = foodExist.menuId
        req.body.unitPrice = foodExist.price * req.body.quantity
    
    

        const record = await orderModel.findOneAndUpdate(orderExist._id, { $push: { orderItems: req.body } }, { new: true, runValidators: true })
        res.send(record)
    }
})


module.exports = { updateOrderItem, addOrderItem, getOrderItem, deletItem }