const catchAsync = require('../utility/catchError')
const tableModel = require('../models/table')

const getTable = catchAsync(async(req,res)=>{

    const records =  await tableModel.find({})
    res.send(records)
})

const getTableById = catchAsync(async(req,res)=>{
    const record = await tableModel.findById(req.params.id)
    res.send(record)
})

const addTable = catchAsync(async(req,res)=>{
    const record = await tableModel.create(req.body)
    res.send(record)
})

const updateTable = catchAsync(async (req,res)=>{
    const updatedRecord = await tableModel.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true })
    res.send(updatedRecord)
})

const deletTable = catchAsync(async(req,res)=>{

    const deletedRecord = await tableModel.findByIdAndDelete(req.params.id)
    res.send(deletedRecord)
})

module.exports = {getTable,getTableById,addTable,updateTable,deletTable}