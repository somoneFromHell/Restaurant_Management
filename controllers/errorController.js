const AppError = require("../utility/appError");

const handelCastError = err => {
    const message = `invalid ${err.path}:${err.value}.`
    return new AppError(message,400);
} 

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    let error = {...err}
    if(error.name === 'CastError')  error = handelCastError(error) ;
    res.status(err.statusCode).send({
        status:err.status,
        message:err.message,
        ErrorCode:err.statusCode
    })
}



