const COE = require('../Module/CoeModule')
const jwt = require('jsonwebtoken')
const CoeLogin =async(req,res) =>
{
    const {Email,password} = req.body
    try{
    const user= await COE.login(Email,password)
    const token = createToken(user._id)
    const userinfo = await COE.findOne({Email})
    const Name = userinfo.Name
    res.status(200).json({Email,token,Name})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
const createToken = (_id) =>
{
return jwt.sign({_id},"sist$COE",{expiresIn:'20d'})
}
const CoeSignup = async(req,res) =>
{
    const {Name,Email,password} = req.body
    try{
    const coe = await COE.signup(Name,Email,password)
    const token = createToken(coe._id)
    res.status(200).json({Name,Email,password,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
module.exports = {CoeSignup,CoeLogin}