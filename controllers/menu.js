const { menuModel } = require('../models/menu')
const Joi = require('joi')
const catchAsync = require('../utility/catchError')
const AppError = require('../utility/appError')


const GetAllMenu = catchAsync(async (req, res) => {
        const records = await menuModel.find()
        if (!records) res.status(400).send('shit man ..')
        res.send(records)
 
})

const GetMenuById = catchAsync(async (req, res) => {
        const record = await menuModel.findById(req.params.id)
        if (!record) res.status(404).send({ sucess:false,msg: 'not found', status: 404 })
        res.send(record)
   })


const PostMenu = catchAsync(async (req, res) => {
        const record = await menuModel.create(req.body)
        res.send(record)
})


const UpdateMenu = catchAsync(async (req, res,next) => {
        const updatedRecord = await menuModel.findOneAndUpdate({_id:req.params.id }, req.body,{runValidators:true,new:true})
        if (!updatedRecord) {return next(new AppError("nodata with given Id",404))}
        res.json(updatedRecord)
})


const DeletMenu = catchAsync(async (req, res) => {
        const deletedRecord = await menuModel.deleteOne({_id:req.params.id})
        if (!deletedRecord) {return next(new AppError("nodata with given Id",404))}
        res.send(deletedRecord)
})


module.exports = {
    GetAllMenu,
    GetMenuById,
    PostMenu,
    UpdateMenu,
    DeletMenu
}