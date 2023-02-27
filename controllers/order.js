const foodModel = require('../models/Food')
const orderModel = require('../models/order')
const tableModel = require('../models/table')
const AppError = require('../utility/appError')

const catchAsync = require('../utility/catchError')


const getorder = catchAsync(async (req, res) => {
    const records = await orderModel.find()
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



const updateOrder = catchAsync(async (req, res, next) => {
    const TebleExist = await tableModel.findById(req.body.TableId);
    if (!TebleExist) {
        return next(new AppError("table don not exist", 400))
    }

    const updatedrecord = await orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updatedrecord) {
        return next(new AppError('no data with given order id' + req.params.id, 404))
    }
    res.send(updatedrecord)
})

const deleteOrder = catchAsync(async (req, res) => {

    const Deletedrecord = await orderModel.findByIdAndDelete(req.params.id)
    if (!Deletedrecord) {
        return next(new AppError('no Data with id' + req.params))
    }
    res.send(Deletedrecord)

})

module.exports = { getorder, getOrderById, addOrder, updateOrder, deleteOrder }