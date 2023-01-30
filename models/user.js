const Joi = require('joi');
const mongo = require('mongoose');



const registerSchema = new mongo.Schema({
    firstName: String,
    lastName: String,
    email: {type:String,unique:true},
    password: String
})

function validateRegistration(user) {
    const registerSchema = Joi.object({
        firstName: Joi.string().required().min(5).max(50),
        lastName: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return registerSchema.validate(user);
}


function validateLogin(user) {
    const Schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return Schema.validate(user);
}


const userModel = mongo.model('user', registerSchema)


module.exports.validateLogin = validateLogin;
module.exports.validateRegistration = validateRegistration;

module.exports.userModel = userModel;