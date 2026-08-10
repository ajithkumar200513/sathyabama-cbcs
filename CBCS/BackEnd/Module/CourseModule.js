const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courseSchema = new Schema(
{
   CourseName:{
    type:String,
    required:true,
   },
   Coordinator:{
    type:mongoose.Types.ObjectId,
    ref:'Staf',
    required:true,
   },
   ProvidedBy:{
    type:String,
    required:true,
   },
   Seats:{
    type:Number,
    required:true,
   },
   RegStudents:[
   {
      type:mongoose.Types.ObjectId,
      ref:'Student'
   }]
},{timestamps:true}
)  
module.exports = mongoose.model('Course',courseSchema)