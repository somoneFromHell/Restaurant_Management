const  foodModel  = require('../models/Food');
const { menuModel } = require('../models/menu');
const mongo = require('mongoose')
const catchAsync = require('../utility/catchError');
const AppError = require('../utility/appError');

const getFood = catchAsync(async (req, res) => {
        const records = await foodModel.find()
        if (!records) {
            return next(new AppError('empty...'))
        }
        res.send(records)
})

const getFoodById = catchAsync(async (req, res,next) => {
        const record = await foodModel.findById(req.params.id)
        if (!record) {
            return next(new AppError('no Data with id'+req.params.id,404))
        }
        res.send(record)

})

const updateFood = catchAsync(async (req, res,next) => {

        const record = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!record) {
            return next(new AppError('no Data with id'+req.params.id,404))
        }
        res.send(record)
})

const addFood = catchAsync(async (req, res,next) => {
        menuExist = await menuModel.findById(req.body.menuId)
        if(!menuExist){
                return next(new AppError('no data with given menuId',404))
        }
        const record = await foodModel.create(req.body)
        res.send(record)
})

const deletFood = catchAsync(async (req, res,next) => {
        const deletedRecord = await foodModel.findByIdAndDelete(req.params.id)
        if (!deletedRecord) {
            return next(new AppError('no Data with id'+req.params.id,404))
        }
        res.send(deletedRecord)
})


module.exports = { getFood, getFoodById, addFood, updateFood, deletFood }