const mongo = require('mongoose');


const tableModel = mongo.model('table',new mongo.Schema({
    numberOfGuests:{type:Number,required:true},
    tableNumber:{type:Number,required:true}
}))


module.exports = tableModel