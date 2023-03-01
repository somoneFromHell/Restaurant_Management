const orderItemModel = require('../models/orderItems')
const orderModel = require('../models/order')
const foodModel = require('../models/Food')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchError')
const orderItemSchema = require('../models/orderItems')
const { Model } = require('mongoose')
const { response } = require('express')


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
    orderItem.quantity = req.body.quantity
    orderItem.foodName = foodExist.food
    orderItem.unitPrice = req.body.quantity * foodExist.price
    const updated = await order.save()
    console.log(updated)
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
    const foodExist = await foodModel.findById(req.body.foodId)
    if (!foodExist) {
        return next(new AppError("food does not exist"))
    }

    var orderItemInOrder = orderExist.orderItems.filter(i => i.foodId.toHexString() === req.body.foodId)

    console.log(orderItemInOrder)

    req.body.foodName = foodExist.food
    req.body.unitPrice = foodExist.price * req.body.quantity


    if (orderItemInOrder.length > 0) {

        orderItemInOrder.quantity += req.body.quantity
        orderItemInOrder.unitPrice = quantity * foodExist.price
        const updated = await order.save()
        console.log(updated)
        res.send(orderItem)

    } else {

        const record = await orderModel.findOneAndUpdate(orderExist._id, { $push: { orderItems: req.body } }, { new: true, runValidators: true })
        res.send(record)
        console.log(orderItemInOrder)
    }
})


module.exports = { updateOrderItem, addOrderItem, getOrderItem, deletItem }