
const { userModel, validateLogin, validateRegistration } = require('../models/user')
const bcrypt = require('bcrypt')
const catchAsync = require('../utility/catchError')
const AppError = require('../utility/appError')
const { rolesModel } = require('../models/roles')
const jwt = require('jsonwebtoken')

const { decodedToken } = require('../utility/authorization')

const getUsers = catchAsync(async (req, res,next) => {
        const records = userModel.find()
        if(!records){
            return next(new AppError('Error...',400))
        }
        res.send(records)
})


const login = catchAsync(async (req, res,next ) => {


        var {email,password} = new userModel(req.body);
        if (!email||!password) return res.status(400).send("not enaugh data")

        const user = await userModel.findOne({ email: req.body.email });
        if (!user) next(new AppError('incorrect email or password !!',400));

        const validPassword = bcrypt.compareSync(req.body.password,user.password)
        if (!validPassword) next(new AppError('incorrect email or password !!',400));

        const findRole = await rolesModel.findById(user.role)
        if (!findRole){return next(new AppError('role dusent exist',404))} 

        const token = jwt.sign({Data: user,pages:findRole.pages}, "jwtPrivateKey",{expiresIn:'1d'})
        res.header('Authorization',token).send({success:true,msg:token})
})

const signup = catchAsync(async (req, res,next) => {

        var getRole = rolesModel.findById(req.body._id)
        if(!getRole){
                return next(AppError("role dusent Exist...",400))
        }
        var record = new userModel(req.body);

        // const salt = await bcrypt.genSalt(10);
        // record.password = await bcrypt.hash(record.password, salt)
        await record.save({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                role:req.body.role
        });
        
        const token = jwt.sign({Data: record,pages:getRole.pages}, "jwtPrivateKey",{expiresIn:'1d'})
        res.header('Authorization',token).send({ Id: record.id, email: record.email, firstName: record.firstName, lastname: record.lastName })
})


const getPersonalData = catchAsync(async(req,res)=>{
        var userExist = userModel.findById(req.params.id)
        if(!userExist){
                return next(AppError("user dusent Exist...",400))
        }
        
                res.send(userExist)
        
})

module.exports = { getUsers, getPersonalData, login, signup }