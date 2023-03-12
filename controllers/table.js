const catchAsync = require('../utility/catchError')
const tableModel = require('../models/table')
const AppError = require('../utility/appError')

const getTable = catchAsync(async(req,res)=>{

    const records =  await tableModel.find({})
    res.send(records)
})

const getTableById = catchAsync(async(req,res)=>{
    const record = await tableModel.findById(req.params.id)
    if(!record){
        next(new AppError('no data with id' + req.params.id))
    }
    res.send(record)
})

const addTable = catchAsync(async(req,res)=>{
    
    const record = await tableModel.create(req.body)
    if(record.occupied === false)record.currentGuests=0
    res.send(record)
})

const updateTable = catchAsync(async (req,res,next)=>{
    const updatedRecord = await tableModel.updateOne({_id:req.params.id},req.body, { new: true, runValidators: true })
    console.log(updatedRecord)
    if(updatedRecord.matchedCount==0){
        return next(new AppError('no data with id '+ req.params.id))
    }
    res.send(updatedRecord)
})

const patchTableStatus = catchAsync(async (req,res,next)=>{
    const tableStatus = await tableModel.findById(req.params.id)
    tableStatus.occupied = !tableStatus.occupied
    tableStatus.save()
    res.send(tableStatus)
}) 

const deletTable = catchAsync(async(req,res,next)=>{

    const deletedRecord = await tableModel.findByIdAndDelete(req.params.id)
    if(!deletedRecord){
        return next(new AppError('no data with id '+req.params.id))
    }
    res.send(deletedRecord)
})

module.exports = {getTable,getTableById,addTable,updateTable,patchTableStatus,deletTable}