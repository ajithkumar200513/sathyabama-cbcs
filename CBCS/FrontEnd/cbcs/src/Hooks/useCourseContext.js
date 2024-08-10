import { CourseContext } from '../Context/CourseContext'
import { useContext } from 'react'

export const useCourseContext = () => {
  const context = useContext(CourseContext)
  if(!context)
  {
      throw Error("Error in CourseContext")
  }
  return context
}

