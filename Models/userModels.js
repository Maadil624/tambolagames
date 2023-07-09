import mongoose from "mongoose";
import validator from 'validator'
const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        validate:validator.isStrongPassword
    }
})

 export default mongoose.model('users',userModel)