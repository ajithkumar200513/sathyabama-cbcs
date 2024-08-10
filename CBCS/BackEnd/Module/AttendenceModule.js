const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendenceSchema = new Schema(
    {
        Date:String,
        StaffId:{
            type:mongoose.Types.ObjectId,
            ref:'Staf'
        },
        StudentInfo:[
            {StudentId:{
                type:mongoose.Types.ObjectId,
                ref:'Student'
             },
             present:Boolean
            }
        ],
        createdAt:{type:Date,
            default:Date.now()
        }
    }
)
module.exports = mongoose.model('Attendence',AttendenceSchema)