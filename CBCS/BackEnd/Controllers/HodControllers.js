const HOD = require('../Module/HodModule')
const jwt = require('jsonwebtoken')
const HodLogin =async(req,res) =>
{
    const {Email,password} = req.body
    try{
    const user= await HOD.login(Email,password)
    const token = createToken(user._id)
    const userinfo = await HOD.findOne({Email})
    const Name = userinfo.Name
    const Dept = user.Dept
    res.status(200).json({Email,token,Name,Dept})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
const createToken = (_id) =>
{
return jwt.sign({_id},"sist$HOD",{expiresIn:'20d'})
}
const HodSignup = async(req,res) =>
{
    const {Name,Email,Dept,password} = req.body
    try{
    const hod = await HOD.signup(Name,Email,Dept,password)
    const token = createToken(hod._id)
    res.status(200).json({Name,Email,Dept,password,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
module.exports = {HodSignup,HodLogin}