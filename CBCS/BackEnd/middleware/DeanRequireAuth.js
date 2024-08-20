const jwt = require('jsonwebtoken')
const Dean = require('../Module/DeanModule')
const DeanrequireAuth = async (req,res,next) =>
{
const {authorization} = req.headers
if(!authorization)
{
    res.status(401).json({error:"invalid Authorization"})
}
const token = authorization.split(' ')[1]
try{
    const {_id} = jwt.verify(token,'sist$Dean')
    req.Dean = await Dean.findOne({_id}).select('_id').select('Dept')
    console.log(req.Dean._id)
    next()
}
catch(error){
console.log(error)
res.status(401).json({error:"Authorization Required"})
}
} 
module.exports = DeanrequireAuth