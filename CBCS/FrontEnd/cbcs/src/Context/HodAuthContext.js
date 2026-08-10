import { createContext,useReducer,useEffect } from "react";
export const HodAuthContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {HOD:action.payload}
        case 'LOGOUT':
           return  {HOD:null}   
        default:
            return state
    }
}
export const HodAuthContextProvider = ({children}) =>
{
    useEffect(() => {
        const hod = JSON.parse(localStorage.getItem('HOD'))
        console.log(hod)
        if(hod)
        {
            dispatch({type:'LOGIN',payload:hod})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    hod:null
   })
   console.log('HodAuthContext',state)
   return(
    <HodAuthContext.Provider value={{...state,dispatch}}>
        {children}
    </HodAuthContext.Provider>
   )
}