const mongo = require('mongoose');


const foodModel = mongo.model('food',new mongo.Schema({
    food:{type:String,required:true,minlength:3,index: {unique: true, dropDups: true}},
    discription:{type:String,required:true},
    price:{type:Number,required:true},
    foodImage:{type:String,required:true},
    menuId:{type:String,required:true,
        validate:{
            validator:function(item) {
                return /^[0-9a-fA-F]{24}$/.test(item);
            },message:property => `${property.value} is not valid id`
        }
    },   
}));




module.exports = foodModel