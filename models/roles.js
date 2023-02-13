const mongo = require('mongoose')



const rightsModel = new mongo.Schema({
    POST:{type:Boolean,required:true},
    PUT:{type:Boolean,required:true},
    DELETE:{type:Boolean,required:true},
    GET:{type:Boolean,required:true}
})
const routsModel = new mongo.Schema({
    name:{type:String},
    rights:{type:rightsModel}
})

const rolesModel = mongo.model('roles',mongo.Schema({
    roleName:{type:String,required:true},
    routs:{type:[routsModel],required:true}
}))
module.exports = {rolesModel,rightsModel}