const Staf = require('../Module/StafModule')
const jwt = require('jsonwebtoken')
const StafLogin =async(req,res) =>
{
    const {Email,password} = req.body
    try{
    const user= await Staf.login(Email,password)
    const token = createToken(user._id)
    const userinfo = await Staf.findOne({Email})
    const Name = userinfo.Name
    const id = userinfo._id
    const course_id = userinfo.CourseHandel
    const CAE1 = userinfo.CAE1
    const CAE2 = userinfo.CAE2
    const SEM = userinfo.SEM
    res.status(200).json({Email,token,Name,id,course_id,CAE1,CAE2,SEM})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
const createToken = (_id) =>
{
return jwt.sign({_id},"sist$Staf",{expiresIn:'20d'})
}
const StafSignup = async(req,res) =>
{
    const {Name,Email,Dept,password} = req.body
    try{
    const staf = await Staf.signup(Name,Email,Dept,password)
    const token = createToken(staf._id)
    res.status(200).json({Name,Email,Dept,password,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
module.exports = {StafSignup,StafLogin}