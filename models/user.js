const mongo = require('mongoose');
const bcrypt = require('bcrypt');
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
        // validate:{
        //     validator: function(v){
        //         return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
        //     }, message:props => `${props.value} not a strong password \n must contain Minimum eight characters, at least one letter and one number`
        // }
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,ref:'roles',
        required:true
    },
    birthDate:{type:String},
    gender:{type:String},
    address:{type:String},
    profileImage:{type:String},
    passwordChangedAt:Date
})

registerSchema.pre('save', async function (next) {
    // only run when password i modified
    if (!this.isModified('password')) return next();
    // hash the password
    this.password = await bcrypt.hash(this.password, 10)
})

// compare change password date with tocken isueing date 
registerSchema.methods.changePasswordAfter = function(jwtTimeStamp){
    if(this.passwordChangedAt){
         const changeTimeStamp = parseInt(
             this.passwordChangedAt.getTime()/1000,10
        )
        return jwtTimeStamp>changeTimeStamp
    }
    return false;
};

const userModel = mongo.model('user', registerSchema)



module.exports.userModel = userModel;