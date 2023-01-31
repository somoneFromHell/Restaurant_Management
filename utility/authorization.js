
const AppError = require('./appError');
const catchAsync = require('./catchError')
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const { userModel } = require('../models/user');

module.exports.authorize = catchAsync(async(req,res,next)=>{
    let token 
    if(req.header('Authorization') &&  req.header('Authorization').startsWith('Bearer'))
    {
        token = req.header('Authorization').split(' ')[1];
    }

    if(!token) return next(new AppError('your not logged in',401));
// VARIFY THE TOKEN 
    const decoded = await promisify(jwt.verify)(token,'jwtPrivateKey')

// (3) cheak if user still exist after the token is isued
    const freshUser = await userModel.findById(decoded.id)
    if(!freshUser){
        return next(new AppError('the user mentioned in token duse no longar Exist',401))
    }

// (4) cheak if user still exist after the token is isued


    next()
})