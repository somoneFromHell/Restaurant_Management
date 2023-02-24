const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
mongo.set('debug', true);

const orderItemModel = mongo.model('orderitem', new mongo.Schema({
    quantity: { type: String, required: true, enum: ['small', 'medium', 'large'] },
    unitPrice: { type: Number, required: true },
    foodId: {type: mongoose.Schema.Types.ObjectId,ref:'food',required:true},
    orderId: { type: mongoose.Schema.Types.ObjectId,ref:'order',required:true}
}));

module.exports = orderItemModel;