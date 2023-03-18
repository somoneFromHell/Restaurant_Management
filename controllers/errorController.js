const { text } = require("body-parser");
const AppError = require("../utility/appError");

const handelCastError =(err)=>{
    const message = `invalid ${err.path}: ${err.value}`;
    return new AppError(message,400);
}

const handelDuplicateFiles = (err) =>{
    obj = err.keyValue
    const message = `${Object.keys(obj)[0]} ${Object.values(obj)[0]} alrady exists`
    return new AppError(message,400)
}

const handelValidationError = (err) =>{
    const errors = Object.values(err.errors).map(item=>item.message);
    const message = `invalid input ${errors.join('. ')}`
    return new AppError(message,400)
}


function sendErrorDev(err,res){
    res.status(err.statusCode).send({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
    console.log({error:err,stack:err.stack})
}

const sendErrorProd = (err,res)=>{
    // oprational ,trusted error:user can do something about it
    if(err.isOperational){
        res.status(err.statusCode).send({
            status:err.status,
            success:false,
            message:err.message
        })
        // programming related error which should not be known to client
    }else{
        res.status(500).send({
            status:'err',
            success:false,
            message:'something wrong with the program.go shout at the backend dev'
        })
    }
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err,res);

    }else if(process.env.NODE_ENV === 'production'){
        if(err.name === 'CastError'){err = handelCastError(err)}
        if(err.code === 11000) err = handelDuplicateFiles(err)
        if(err.name === 'ValidationError') err = handelValidationError(err)
        sendErrorProd(err,res);
    }  
}



