const {rolesModel} = require('../models/roles')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchError')


 const getRoles = catchAsync(async(req,res)=>{
    const records = await rolesModel.find()
    if(!records){
        return next(new AppError("empty..."))
    }
    console.log(req.originalUrl)
    console.log(req.method)
    res.send(records)
})

const addRoles = catchAsync(async(req,res)=>{
    const record = await rolesModel.create(req.body);
    res.send(record)
})


module.exports = {getRoles,addRoles}