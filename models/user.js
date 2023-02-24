const Joi = require('joi');
const mongo = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { string } = require('joi');
const { default: mongoose } = require('mongoose');

const registerSchema = new mongo.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String, 
        unique: true, 
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
            }, message: props => `${props.value} is not valid email`
        }
    },
    password: {
        type: String,
        required: true,
        min: 8,
        validate:{
            validator: function(v){
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v);
            }, message:props => `${props.value} not a strong password \n must contain Minimum eight characters, at least one letter and one number`
        }
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,ref:'roles',
        required:true
    },
    passwordChangedAt:Date
})

registerSchema.pre('save', async function (next) {
    // only run when password i modified
    if (!this.isModified('password')) return next();

    // hash the password
    this.password = await bcrypt.hash(this.password, 10)
})



registerSchema.methods.genratAuthToken = function(){
    const token = jwt.sign({id: this._id}, "jwtPrivateKey",{expiresIn:'1d'})
    return token;
}

// compare change password date with tocken isueing date 
registerSchema.methods.changePasswordAfter = function(jwtTimeStamp){
    if(this.passwordChangedAt){
         const changeTimeStamp = parseInt(
             this.passwordChangedAt.getTime()/1000,10
        )
        console.log(changeTimeStamp,jwtTimeStamp);
        return jwtTimeStamp>changeTimeStamp
    }
    return false;
};

const userModel = mongo.model('user', registerSchema)



module.exports.userModel = userModel;