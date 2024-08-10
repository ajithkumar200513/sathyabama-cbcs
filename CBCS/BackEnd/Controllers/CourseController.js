const Course = require('../Module/CourseModule')
const User = require('../Module/userModule')
const Staf = require('../Module/StafModule')
const Attendance = require('../Module/AttendenceModule')
const express = require('express')
const mongoose = require('mongoose')
const getCourse =async(req,res)=>
{
const courses = await Course.find().sort({createdAt:-1}).populate('Coordinator')
res.status(200).json(courses)
}
const getStudentRegCourse =async(req,res)=>
{
const {id} = req.params
const courses = await Course.find({_id:id}).populate('RegStudents')
res.status(200).json(courses)
}
const getRegStudents =async(req,res)=>
{
const {id} = req.params
const courses = await Course.find({Coordinator:id}).populate('RegStudents')
res.status(200).json(courses)
}
const getStudentInfo =async(req,res)=>
{
const {id} = req.params
const courses = await User.find({CourseInfo:id})
res.status(200).json(courses)
}
const getUserCourse =async(req,res)=>
{
const {id} = req.params
const courses = await User.find({_id:id}).sort({createdAt:-1}).populate('CourseInfo')
console.log(courses)
res.status(200).json(courses)
}
const getHodCourse =async(req,res)=>
{
const Dept = req.HOD.Dept
const user_id = req.HOD._id
console.log(Dept)
console.log(user_id)
const courses = await Course.find({ProvidedBy:Dept}).sort({createdAt:-1}).populate('Coordinator')
res.status(200).json(courses)
}

const getStafsInfo =async(req,res)=>
{
const Dept = req.HOD.Dept
const Stafs = await Staf.find({Dept:Dept}).sort({createdAt:-1}).select('_id').select('Name').select('CourseHandel')
res.status(200).json(Stafs)
}
const updateStafsInfo =async(req,res)=>
{
const {id} = req.params
const {CourseHandel} = req.body
const Stafs = await Staf.findOneAndUpdate({_id:id},{CourseHandel:CourseHandel},{new:true})
res.status(200).json(Stafs)
}

const createCourse = async(req,res)=>
{
    console.log(req.body)
    try{
    const {CourseName,Coordinator,ProvidedBy, Seats} = req.body
    const course= await Course.create({CourseName,Coordinator,ProvidedBy,Seats})
    const updateStaf = await  Course.findOne({_id:course.id}).populate('Coordinator')
    updateStaf.Coordinator.CourseHandel=course.id
    updateStaf.Coordinator.save()
    const courses = await Course.find().populate('Coordinator').select('Name')
    console.log(courses)
    res.status(200).json(course)

  }
  catch(error){
    res.status(404).json({error:error.message})    
}

}
const updatecourse = async(req,res) =>
{
   const {id} = req.params
   const {user_id} = req.body
   if(!mongoose.Types.ObjectId.isValid(id))
   {
    return res.status(404).json({error:"Id Not Found"})
   }
   const updatedcourse = await Course.findOneAndUpdate({_id:id},{$inc:{Seats:-1},$push:{"RegStudents":user_id}},{new:true}).populate('Coordinator')
   if(!updatecourse)
   {
    res.status(404).json({error:error.message})
   }
   res.status(200).json(updatedcourse)
}
const deleteCourse = async(req,res) =>
{
   const {id} = req.params
   const {user_id} = req.body
   if(!mongoose.Types.ObjectId.isValid(id))
   {
    return res.status(404).json({error:"Id Not Found"})
   }
   const updatedcourse = await Course.findOneAndDelete({_id:id}).populate('Coordinator').populate('RegStudents').exec()
   console.log(updatedcourse.RegStudents.forEach((value)=>{value.CourseInfo=null
   value.save()}))
   updatedcourse.Coordinator.CourseHandel=null
   updatedcourse.Coordinator.save()
   if(!updatecourse)
   {
    res.status(404).json({error:error.message})
   }
   res.status(200).json(updatedcourse)
}
const updateUserCourse = async(req,res) =>
{
   const {id} = req.params
   const {course_id} = req.body
   if(!mongoose.Types.ObjectId.isValid(id))
   {
    return res.status(404).json({error:"Id Not Found"})
   }
   const updatedUsercourse = await User.findOneAndUpdate({_id:id},{CourseInfo:course_id},{new:true})
   //const info = await User.find({}).populate('CourseInfo')
   if(!updatedUsercourse)
   {
    res.status(404).json({error:"Error in fetch"})
   }
   res.status(200).json(updatedUsercourse)
}

const updateStudentInfo = async(req,res) =>
{
   const {id} = req.params
   const {Date} = req.body
   const {present} = req.body
   const {Id} = req.body
   const updatedInfo = await Attendance.findOneAndUpdate({$and:[{Date:{$eq:Date}},{StaffId:{$eq:Id}}]},{$push:{'StudentInfo':{'StudentId':id,'present':present}}},{new:true})
   if(!updatedInfo)
   {
    res.status(404).json({error:error.message})
   }
   res.status(200).json(updatedInfo)
}
const createAttendence = async(req,res)=>
{
   const {Date,Id} = req.body
   const attendence = await Attendance.create({Date:Date,StaffId:Id})
   if(!attendence)
   {
    res.status(404).json({error:error.message})
   }
   res.status(200).json(attendence)
}
const getDate = async (req, res) => {
   try {
     const { id } = req.params;
     const date = await Attendance.findOne({ StaffId: id }).sort({ createdAt: -1 }).select('Date StaffId');
 
     if (!date) {
       return res.status(404).json({ message: "Error in fetching" });
     }
 
     res.status(200).json(date);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error" });
   }
 };
const stuinfo = async(req,res) =>
{
   const {Dept} = req.body
   const info = await User.find({Dept:Dept}).populate('CourseInfo')
   res.status(200).json(info)
}
const getAttendenceInfo = async(req,res) =>
{
   const {Id} = req.body;
   const {Date} = req.body;
   const Attendence =  await Attendance.findOne({$and:[{Date:{$eq:Date}},{StaffId:{$eq:Id}}]}).populate({path:'StudentInfo.StudentId',select:'Name RegNo '}).exec()
   res.status(200).json(Attendence) 
}
const getAttendenceDate= async(req,res) =>
{
   const {Id} = req.body;
   const Attendence =  await Attendance.find({StaffId:Id}).select('Date')
   res.status(200).json(Attendence) 
}
const StudentAttendence= async(req,res) =>
{
   const {id} = req.params;
   const {Date} = req.body;
   const {present} = req.body;
   const Attendence =  await User.findOneAndUpdate({_id:id},{$push:{'Attendence':{'Date':Date,'present':present}}},{new:true})
   res.status(200).json(Attendence) 
}
const StudentMarks1= async(req,res) =>
{
   const {id} = req.params;
   
   const {Marks} = req.body;
   const Attendence =  await User.findOneAndUpdate({_id:id},{CAE1:Marks},{new:true})
  
   res.status(200).json(Attendence) 
}
const StudentMarks2= async(req,res) =>
   {
      const {id} = req.params;
      const {Marks} = req.body;
      const Attendence =  await User.findOneAndUpdate({_id:id},{CAE2:Marks},{new:true})
      
     
      res.status(200).json(Attendence) 
   }
   const StudentMarks3= async(req,res) =>
      {
         const {id} = req.params;
         const {Marks} = req.body;
         const Attendence =  await User.findOneAndUpdate({_id:id},{SEM:Marks},{new:true})
         res.status(200).json(Attendence) 
      }
const updateStaffExamInfo =async(req,res)=>
{
const {id} = req.params
const {CAE1} = req.body
const{CAE2} = req.body
const{SEM} = req.body
const Stafs = await Staf.findOneAndUpdate({_id:id},{CAE1:CAE1,CAE2:CAE2,SEM:SEM},{new:true})
res.status(200).json(Stafs)
}
const getCoeStudentInfo =async(req,res)=>
   {
   const {Dept} = req.body
   const courses = await User.find({Dept:Dept}).populate('CourseInfo')
   res.status(200).json(courses)
   }


module.exports = {
    getCourse,createCourse,getHodCourse,updatecourse,updateUserCourse,getUserCourse,updateStudentInfo,
    getStudentRegCourse,deleteCourse,getStafsInfo,updateStafsInfo,getRegStudents,getStudentInfo,createAttendence,getDate,stuinfo,getAttendenceInfo,getAttendenceDate,StudentAttendence,StudentMarks1,StudentMarks3,StudentMarks2,updateStaffExamInfo,getCoeStudentInfo}