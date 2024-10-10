const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please enter name']
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: { 
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        select:false
        //   maxLength: [23, "Password must not be more than 23 characters"],
      },
    avatar: {
        type: String,
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    role :{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})



// Example function that hashes a password before saving a user
userSchema.pre('save', async function (next) {
    // Check if password field is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password with salt rounds
    try {
        const saltRounds = 10;  // Specify number of salt rounds
        this.password = await bcrypt.hash(this.password, saltRounds);  // Ensure 'this.password' is not undefined
        next();
    } catch (err) {
        next(err);  // Pass the error to next middleware
    }
});


userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function(){
    //Generate Token
    const token = crypto.randomBytes(20).toString('hex'); 

    //Generate Hash and set to resetPasswordToken
   this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

   //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token
}


let model =  mongoose.model('User', userSchema);


module.exports = model;