const DEAN = require('../Module/DeanModule')
const jwt = require('jsonwebtoken')
const DeanLogin =async(req,res) =>
{
    const {Email,password} = req.body
    try{
    const user= await DEAN.login(Email,password)
    const token = createToken(user._id)
    const userinfo = await DEAN.findOne({Email})
    const Name = userinfo.Name
    const School = user.School
    res.status(200).json({Email,token,Name,School})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
const createToken = (_id) =>
{
return jwt.sign({_id},"sist$Dean",{expiresIn:'20d'})
}
const DeanSignup = async(req,res) =>
{
    const {Name,Email,School,password} = req.body
    try{
    const Dean = await DEAN.signup(Name,Email,School,password)
    const token = createToken(Dean._id)
    res.status(200).json({Name,Email,School,password,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
module.exports = {DeanSignup,DeanLogin}