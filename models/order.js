
const mongo = require('mongoose');

const orderModel = mongo.model('order',mongo.Schema({
    orderDate:{type:Date,required:true},
    TableId:{type:String,required:true}
}))

module.exports = orderModel