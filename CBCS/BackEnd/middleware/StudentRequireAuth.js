const jwt = require('jsonwebtoken')
const User = require('../Module/userModule')
const StudentrequireAuth = async (req,res,next) =>
{
const {authorization} = req.headers
if(!authorization)
{
    res.status(401).json({error:"invalid Authorization"})
}
const token = authorization.split(' ')[1]
try{
    const {_id} = jwt.verify(token,'sist$stud')
    req.Student = await User.findOne({_id}).select('_id').select('CourseInfo')
    next()
}
catch(error){
console.log(error)
res.status(401).json({error:"Authorization Required"})
}
} 
module.exports = StudentrequireAuth