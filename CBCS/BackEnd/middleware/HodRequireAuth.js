const jwt = require('jsonwebtoken')
const hod = require('../Module/HodModule')
const HodrequireAuth = async (req,res,next) =>
{
const {authorization} = req.headers
if(!authorization)
{
    res.status(401).json({error:"invalid Authorization"})
}
const token = authorization.split(' ')[1]
try{
    const {_id} = jwt.verify(token,'sist$HOD')
    req.HOD = await hod.findOne({_id}).select('_id').select('Dept')
    console.log(req.HOD._id)
    next()
}
catch(error){
console.log(error)
res.status(401).json({error:"Authorization Required"})
}
} 
module.exports = HodrequireAuth