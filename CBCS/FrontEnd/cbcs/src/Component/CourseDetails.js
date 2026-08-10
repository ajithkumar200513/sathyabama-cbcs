import React from 'react'
import {useAuthContext} from '../Hooks/useAuthContext'
import StudentTable from './StudentTable'
const CourseDetails = ({course}) => {
const { user } = useAuthContext()
if(!user)
{
    return
}  
console.log(course)
return (
    <div>
     <StudentTable
     key={course._id}
     course={course}/>
    </div>
  )
}

export default CourseDetails
