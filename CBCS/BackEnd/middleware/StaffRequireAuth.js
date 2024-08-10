const jwt = require('jsonwebtoken')
const Staf = require('../Module/StafModule')
const StaffrequireAuth = async (req,res,next) =>
{
const {authorization} = req.headers
if(!authorization)
{
    res.status(401).json({error:"invalid Authorization"})
}
const token = authorization.split(' ')[1]
try{
    const {_id} = jwt.verify(token,'sist$Staf')
    req.Staff = await Staf.findOne({_id}).select('_id').select('Dept')
    next()
}
catch(error){
console.log(error)
res.status(401).json({error:"Authorization Required"})
}
} 
module.exports = StaffrequireAuth