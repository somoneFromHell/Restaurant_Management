const mongo = require('mongoose');

const orderItemModel = mongo.model('orderitem', new mongo.Schema({
    quntity: { type: String, required: true, enum: ['small', 'medium', 'large'] },
    unitPrice: { type: Number, required: true },
    foodId: {
        type: String,required:true,
        validate: {
            validator: function (v) {
                return /^[0-9a-fA-F]{24}$/.test(v);
            }
            , message: props => `[ ${props.value} ] is not a valid id`
        }
    },
    orderId: { type: String,required:true,validate:{
        validator:function (v){
            return /^[0-9a-fA-F]{24}$/.test(v);
        },message:p => `[ ${p.value} ]is not a valid id`
    }
}
}));

module.exports = orderItemModel;