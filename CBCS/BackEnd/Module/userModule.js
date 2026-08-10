const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema(
{
    Name:{
        type:String,
    },
    Email:{
        type:String,
        unique:true
    },
    Batch:{
        type:String,
    },
    Dept:{
        type:String
    },
    RegNo:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    CourseInfo:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Course'
    },
    Attendence:[
        {
            Date:
            {
                type:String
            },
            present:
            {
                type:Boolean,
                default:false
            }  
        }
    ],
   CAE1:{
    type:Number
   },
   CAE2:{
    type:Number
   },
   SEM:{
    type:Number
   }
}
)  

userSchema.statics.signup = async function(Name,Email,Batch,Dept,RegNo,password)
{
if(!Email || !password || !Batch || !Dept || !RegNo || !password)
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
const RegNoexist = await this.findOne({RegNo})
if(RegNoexist)
{
    throw Error("Registor Number  already Exists")
}
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)
const user = this.create({Name,Email,Batch,Dept,RegNo,password:hash})
return user
}
userSchema.statics.login = async function(RegNo,password)
{
    if(!RegNo || !password)
    {
        throw Error("username and password required")
    }
    const user =await this.findOne({RegNo})
    if(!user)
    {
        throw Error("Invalid regNo")
    }
    const pass = await bcrypt.compare(password,user.password)
    if(!pass)
    {
        throw Error("Incorrect Password")
    }
    return user
}
module.exports = mongoose.model('Student',userSchema)
