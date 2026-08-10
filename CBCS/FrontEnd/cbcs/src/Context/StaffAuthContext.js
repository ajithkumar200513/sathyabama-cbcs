import { createContext,useReducer,useEffect } from "react";
export const StaffAuthContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {staff:action.payload}
        case 'LOGOUT':
           return  {staff:null}   
        default:
            return state
    }
}
export const StaffAuthContextProvider = ({children}) =>
{
    useEffect(() => {
        const Staff = JSON.parse(localStorage.getItem('Staff'))
        console.log(Staff)
        if(Staff)
        {
            dispatch({type:'LOGIN',payload:Staff})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    staff:null
   })
   console.log('StaffAuthContext',state)
   return(
    <StaffAuthContext.Provider value={{...state,dispatch}}>
        {children}
    </StaffAuthContext.Provider>
   )
}