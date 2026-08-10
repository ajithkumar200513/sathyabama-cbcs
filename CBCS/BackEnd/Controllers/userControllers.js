const User = require('../Module/userModule')
const jwt = require('jsonwebtoken')
const userLogin =async(req,res) =>
{
    const {RegNo,password} = req.body
    try{
    const user= await User.login(RegNo,password)
    const token = createToken(user._id)
    const Name = user.Name
    const user_id = user._id
    const CourseInfo = user.CourseInfo
    res.status(200).json({user_id,RegNo,token,Name,CourseInfo})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
const createToken = (_id) =>
{
return jwt.sign({_id},"sist$stud",{expiresIn:'20d'})
}
const userSignup = async(req,res) =>
{
    const {Name,Email,Batch,Dept,RegNo,password} = req.body
    try{
    const user=await User.signup(Name,Email,Batch,Dept,RegNo,password)
    const user_id = user._id
    const token = createToken(user._id)
    res.status(200).json({user_id,Name,Email,Batch,Dept,RegNo,password,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
module.exports = {userSignup,userLogin}