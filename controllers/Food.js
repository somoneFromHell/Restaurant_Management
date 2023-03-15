const  foodModel  = require('../models/Food');
const { menuModel } = require('../models/menu');
const mongo = require('mongoose')
const catchAsync = require('../utility/catchError');
const AppError = require('../utility/appError');
const multer = require('multer')


const multarStorage = multer.diskStorage({
        destination:(req,file,cb)=>{
                cb(null,'public/image/food')
        },
        filename(req,file,cb){
                const ext =file.mimetype.split('/')[1];
                cb(null,`${req.body.food}-${Date.now()}.${ext}`)
        }
})

const multerFilter = (req,file,cb)=>{
        if(file.mimetype.split('/')[0] === 'image'){
                cb(null,true)
        }else{
                cb(new AppError('not an image',400),false)
        }
}
const upload = multer({storage:multarStorage,fileFilter:multerFilter})


const imageUpload = upload.single('foodImage')

const getFood = catchAsync(async (req, res) => {
        const records = await foodModel.find()
        if (!records) {
            return next(new AppError('empty...'))
        }
        res.send(records)
})

const getFoodById = catchAsync(async (req, res,next) => {
        const record = await foodModel.findById(req.params.id)
        if (!record) {
            return next(new AppError('no Data with id'+req.params.id,404))
        }
        res.send(record)

})

const getFoodByMenuId = catchAsync(async(req,res,next)=>{
        const record = await menuModel.findById(req.params.menuId)
        if(!record){
                return next(new AppError('no data with Id'+req.params.menuId,404))
        }
        const records = await foodModel.find({menuId:req.params.menuId})
        res.send(records)
})

const updateFood = catchAsync(async (req, res,next) => {

        menuExist = await menuModel.findById(req.body.menuId)
        if(!menuExist){
                return next(new AppError(`no data with given menuId ${req.body.menuId}`,404))
        }
        if(req.file){req.body.foodImage = req.file.filename;}
        else{req.body.foodImage = 'noimage.jpg'}
        const record = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!record) {
            return next(new AppError('no Data with id'+req.params.id,404))
        }
        
        res.send(record)
})

const addFood = catchAsync(async (req, res,next) => {
        menuExist = await menuModel.findById(req.body.menuId)
        if(!menuExist){
                return next(new AppError(`no data with given menuId ${req.body.menuId}`,404))
        }
        if(req.file){req.body.foodImage = req.file.filename;}
        else{req.body.foodImage = 'noimage.jpg'}
        const record = await foodModel.create(req.body)
        
        res.send(record)
})

const deletFood = catchAsync(async (req, res,next) => {
        const deletedRecord = await foodModel.findByIdAndDelete(req.params.id)
        if (!deletedRecord) {
            return next(new AppError('no Data with id'+req.params.id,404))
        }
        res.send(deletedRecord)
})


module.exports = { getFood, getFoodById,getFoodByMenuId ,imageUpload,addFood, updateFood, deletFood }