const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
const orderItemSchema = require('./orderItems');

const invoiceModel = mongo.model('invoice',new mongo.Schema({

    tableNumber:{type:String,required:true},
    orderItems:{type:[orderItemSchema],required:true},
    totalAmount:{type:Number,required:true},
    subTotal:{type:Number,required:true},
    cGst:{type:Number,required:true},
    sGst:{type:Number,required:true}
    
},{timestamps:true}));


module.exports = invoiceModel;

