const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const orderItemSchema = new mongo.Schema({
    quantity: { type: Number, required: true,min:1},
    unitPrice: { type: Number },
    foodId: {type: mongoose.Schema.Types.ObjectId,ref:'food',required:true},
    menuId: {type: mongoose.Schema.Types.ObjectId,ref:'menu',required:true},

    foodName:String
})

const orderItemModel = mongo.model('orderitem', orderItemSchema);

module.exports = orderItemSchema;