const { string, date } = require('joi');
const mongo = require('mongoose')

const menuModel = mongo.model('menu', new mongo.Schema({
    name: {type:String,required:[true,'must provide menu title'],minlength:3,unique:true},
    catagory:{type:String,required:true},
    startDate:{type:Date},
    endDate:{type:Date},
    discription: {type:String,minlength:[10,'must be more than 5 words']},
}));

module.exports.menuModel = menuModel;