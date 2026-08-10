const jwt = require('jsonwebtoken')
const coe = require('../Module/CoeModule')
const CoerequireAuth = async (req,res,next) =>
{
const {authorization} = req.headers
if(!authorization)
{
    res.status(401).json({error:"invalid Authorization"})
}
const token = authorization.split(' ')[1]
try{
    const {_id} = jwt.verify(token,'sist$COE')
    req.COE = await coe.findOne({_id}).select('_id').select('Dept')
    console.log(req.COE._id)
    next()
}
catch(error){
console.log(error)
res.status(401).json({error:"Authorization Required"})
}
} 
module.exports = CoerequireAuth