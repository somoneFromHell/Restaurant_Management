const foodModel = require('../models/Food')
const orderModel = require('../models/order')
const tableModel = require('../models/table')
const AppError = require('../utility/appError')

const catchAsync = require('../utility/catchError')


const getorder = catchAsync(async (req, res) => {
    const records = await orderModel.find()
    if (!record) {
        return next(new AppError("no data with Id" + req.params.id, 400))
    }
    res.send(records)
})

const getOrderById = catchAsync(async (req, res) => {
    const record = await orderModel.findById(req.params.id)
    if (!record) {
        return next(new AppError("no data with Id" + req.params.id, 400))
    }
    res.send(record)
})

const addOrder = catchAsync(async (req, res, next) => {
    const TebleExist = await tableModel.findById(req.body.TableId);
    if (!TebleExist) {
        return next(new AppError("table does not exist", 400))
    }
    const record = await orderModel.create(req.body)
    res.send(record)
})



const changeOrderStatus = catchAsync(async (req, res, next) => {

    const order = await orderModel.findById(req.params.id)
    if (!order) {
        return next(new AppError('no data with given order id' + req.params.id, 404))
    }

    order.invoiceGenrated = !order.invoiceGenrated
    order.save()
    res.send(order)

})

const deleteOrder = catchAsync(async (req, res) => {

    const Deletedrecord = await orderModel.findByIdAndDelete(req.params.id)
    if (!Deletedrecord) {
        return next(new AppError('no Data with id' + req.params.id))
    }
    res.send(Deletedrecord)

})


const deleteOrderbyTableId = catchAsync(async (req, res,next) => {

    const record = await orderModel.find({TableId:req.params.TableId})
    if(!record || record.invoiceGenrated === false){
        return next(new AppError('can not delete the order' + req.params))
    }
    const Deletedrecord = await orderModel.findOneAndDelete({TableId:req.params.TableId})
    console.log(Deletedrecord)
    if (!Deletedrecord) {
        return next(new AppError('no Data with id' + req.params.TableId,false))
    }
    res.send(Deletedrecord)

})

const getOrderbyTableId = catchAsync(async (req, res,next) => {

    const record = await orderModel.find({TableId:req.params.TableId,invoiceGenrated :false})
    if(!record || record.invoiceGenrated === false){
        return next(new AppError('can not delete the order' + req.params))
    }
    res.send(record[0])

})


module.exports = { getorder, getOrderById,deleteOrderbyTableId,getOrderbyTableId, addOrder, changeOrderStatus, deleteOrder }