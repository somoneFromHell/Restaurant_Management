const mongo = require('mongoose');


const tableModel = mongo.model('table',new mongo.Schema({
    numberOfGuests:{type:Number},
    tableNumber:{type:Number,required:true,unique:true},
    capacity:{type:Number,required:true}
}))


module.exports = tableModel