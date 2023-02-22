const mongo = require('mongoose');


const tableModel = mongo.model('table',new mongo.Schema({
    tableNumber:{type:Number,required:true,unique:true},
    capacity:{type:Number,required:true},
    occupied:{type:Boolean,required:true},
    currentGuests:{type:Number,required:true}
}))


module.exports = tableModel