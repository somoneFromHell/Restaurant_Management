const mongo = require('mongoose');


const tableModel = mongo.model('table',new mongo.Schema({
    tableNumber:{type:Number,required:true,unique:true},
    capacity:{type:Number,required:true},
    occupied:{type:Boolean,default:false},
    currentGuests:{type:Number,default:0}
}))


module.exports = tableModel