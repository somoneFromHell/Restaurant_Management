
const AppError = require('./appError');
const catchAsync = require('./catchError')
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const { userModel } = require('../models/user');
const { rolesModel } = require('../models/roles');

module.exports.authorize = catchAsync(async(req,res,next)=>{
    let token 
    if(req.header('Authorization') &&  req.header('Authorization').startsWith('Bearer'))
    {
        token = req.header('Authorization').split(' ')[1];
    }

    if(!token) return next(new AppError('your not logged in',401));
// decode the token 
    const decoded = await promisify(jwt.verify)(token,'jwtPrivateKey')
    console.log(decoded)

   

// (3) cheak if user still exist after the token is isued
    const currentUser = await userModel.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('the user mentioned in token duse no longar Exist',401))
    }

    //    (2) cheak if the user is allowd to execute this operation

    const userRole = await rolesModel.findById(currentUser.role)
    const Api =  req.originalUrl.split('/')[2]
    const method = req.method
    const routInRole = userRole.routs.filter((item)=>item.name === Api)
    console.log(Api,routInRole)
    if(!routInRole){
        console.log('error')
        return next(new AppError('not authorized',401))
    }
    // if(routInRole.rights.){
    //     return next(new AppError('not authorized',401))

    // }
    

// (4) cheak if password has changed after the token is isued
    if(currentUser.changePasswordAfter(decoded.iat)){
        return next(new AppError('password has been changed',401))
    }
    req.user = currentUser;
    next()
})