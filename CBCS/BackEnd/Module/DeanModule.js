const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema
const DeanSchema = new Schema(
{
    Name:{
        type:String,
    },
    Email:{
        type:String,
        unique:true
    },
    School:{
        type:String 
    },
    password:{
        type:String,
        required:true
    }
}
)  
DeanSchema.statics.signup = async function(Name,Email,School,password)
{
if(!Email || !password  || !School || !password)
{
    throw Error("Missing Field")
}
if(!validator.isEmail(Email))
{
    throw Error("Enter a valid email")
}
if(!validator.isStrongPassword(password))
{
    throw Error("Enter a Strong password")
}
const exist = await this.findOne({Email})
if(exist)
{
    throw Error("Email already Exists")
}
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)
const user = this.create({Name,Email,School,password:hash})
return user
}
DeanSchema.statics.login = async function(Email,password)
{
    if(!Email || !password)
    {
        throw Error("username and password required")
    }
    const user = await this.findOne({Email})
    if(!user)
    {
        throw Error("Invalid Email")
    }
    const pass = await bcrypt.compare(password,user.password)
    if(!pass)
    {
        throw Error("Incorrect Password")
    }
    return user
}
module.exports = mongoose.model('DEAN',DeanSchema)
