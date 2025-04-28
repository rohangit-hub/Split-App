import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// SCHEMA DEFINE
const userSchema = new mongoose.Schema({

    fullName: { type: String, require:[true, 'User full name required'] },
    userName: { type: String, lowercase: true, trim: true, require:[true, 'Username required'] },
    email: { type: String, trim: true, require:[true, 'User email required'] },
    password: { type: String, trim: true, require:[true, 'User password required'] },
    verifyOtp:{type:String , default: ""},
    verifyOtpExpireAt:{type: Number  , default: 0},
    isAccountVarified:{type:Boolean, default: false},
    resetOtp:{type:String , default: ""},
    resetOtpExpireAt:{type: Number  , default: 0},

}, { timestamps: true })


// HASH USER PASSWORD BEFORE SAVE
userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password , salt)
}

// Compare Hash Passwords
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password)
}


// JWT Token Generate
userSchema.methods.jwtTokenGenerate = async function(){
    const token = jwt.sign({_id : this._id} , process.env.JWTSCERET , {expiresIn : '7d'})
    return token
}

// MODEL DEFINE
export const User = mongoose.model("User" , userSchema)