const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');


const foodModel = mongo.model('food',new mongo.Schema({
    food:{type:String,required:true,minlength:3,unique:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    foodImage:{type:String,required:true},
    menuId:{type:mongoose.Schema.Types.ObjectId,ref:'menu',required:true},   
}));

module.exports = foodModel