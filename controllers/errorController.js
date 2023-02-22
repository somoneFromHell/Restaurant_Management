const { text } = require("body-parser");
const AppError = require("../utility/appError");

const handelCastError =(err)=>{
    const message = `invalid ${err.path}: ${err.value}`;
    return new AppError(message,400);
}

const handelDuplicateFiels = (err) =>{
    obj = err.keyValue
    const message = `${Object.keys(obj)[0]} ${Object.values(obj)[0]} alrady exists`
    return new AppError(message,400)
}

const handelValidationError = (err) =>{
    const errors = Object.values(err.errors).map(item=>item.message);
    const message = `invalid input ${errors.join('. ')}`
    return new AppError(message,400)
}


function sendEroorDev(err,res){
    res.status(err.statusCode).send({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

const sendEroorProd = (err,res)=>{
    // oprational ,trusted error:user can do somthing about it
    if(err.isOperational){
        res.status(err.statusCode).send({
            status:err.status,
            message:err.message
        })
        // programming releted error which shud not be known to client
    }else{
        res.status(500).send({
            status:'err',
            message:'somthing wrong with the programm.go shout at the backend dev'
        })
    }
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development'){
        sendEroorDev(err,res);

    }else if(process.env.NODE_ENV === 'production'){
        if(err.name === 'CastError'){err = handelCastError(err)}
        if(err.code === 11000) err = handelDuplicateFiels(err)
        if(err.name === 'ValidationError') err = handelValidationError(err)
        sendEroorProd(err,res);
    }  
}



