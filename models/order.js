
const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
const orderItemSchema = require('./orderItems');
const orderItemModel = require('./orderItems');
mongo.set('debug', true);






const orderModel = mongo.model('order',mongo.Schema({
    orderDate:{type:Date,required:true},
    TableId:{type:mongoose.Schema.Types.ObjectId,ref:'table',required:true},
    reserveTime:{type:Date},
    clearTime:{type:Date},
    orderItems:{type:[orderItemSchema],required:true}
}))

module.exports = orderModel