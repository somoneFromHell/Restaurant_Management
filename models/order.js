
const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
mongo.set('debug', true);

const orderModel = mongo.model('order',mongo.Schema({
    orderDate:{type:Date,required:true},
    TableId:{type:mongoose.Schema.Types.ObjectId,ref:'table',required:true}
}))

module.exports = orderModel