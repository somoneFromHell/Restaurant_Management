const mongo = require('mongoose')



const rightsModel = new mongo.Schema({
    POST:{type:Boolean,required:true},
    PUT:{type:Boolean,required:true},
    DELETE:{type:Boolean,required:true},
    GET:{type:Boolean,required:true},
    PATCH:{type:Boolean,required:true}
})
const routsModel = new mongo.Schema({
    name:{type:String},
    rights:{type:rightsModel}
})

const pagesModel = new mongo.Schema({
    navItem:{type:Boolean,default:false},
    pageName:{type:String},
    pageRoute:{type:String}
})

const rolesModel = mongo.model('roles',mongo.Schema({
    roleName:{type:String,required:true},
    routs:{type:[routsModel],required:true},
    pages:{type:[pagesModel]}
}))
module.exports = {rolesModel,rightsModel}