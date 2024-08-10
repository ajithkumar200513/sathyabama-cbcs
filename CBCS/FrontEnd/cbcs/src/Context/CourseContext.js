import React, { useEffect } from 'react'
import { createContext,useReducer } from 'react'

export const CourseContext = createContext()

export const coursereducer = (state,action) =>
    {
        switch(action.type)
        {
            case 'SET_COURSE':
                return{
                course:action.payload
            }
            case 'CREATE_COURSE':
                return{
                 course:[action.payload,...state.course]
                }  
            case 'DELETE_COURSE':
                return{
                    course:state.course.filter(c => c._id !== action.payload._id)
                }    
            default:
                return state
        }
    }
export const CourseContextProvider = ({children}) => {
    
    const [state,dispatch] = useReducer(coursereducer,{
        course:null
    })
  return (
    <CourseContext.Provider value={{...state,dispatch}}>
        {children}
    </CourseContext.Provider>
  )
}


