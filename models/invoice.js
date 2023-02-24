const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const invoiceModel = mongo.model('invoice',new mongo.Schema({

    orderId:{type:mongoose.Schema.Types.ObjectId,ref:'order',required:true},
    paymentMethod:{type:String,required:true,enum:['card','cash']},
    paymentStatus:{type:String,required:true,enum:['pending','success']},
    paymentDeueDate:{type:Date,required:true}
    
},{timestamps:true}));


module.exports = invoiceModel;

