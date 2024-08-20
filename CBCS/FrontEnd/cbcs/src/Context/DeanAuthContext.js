import { createContext,useReducer,useEffect } from "react";
export const DeanAuthContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {DEAN:action.payload}
        case 'LOGOUT':
           return  {DEAN:null}   
        default:
            return state
    }
}
export const DeanAuthContextProvider = ({children}) =>
{
    useEffect(() => {
        const DEAN = JSON.parse(localStorage.getItem('DEAN'))
        console.log(DEAN)
        if(DEAN)
        {
            dispatch({type:'LOGIN',payload:DEAN})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    hod:null
   })
   console.log('DeanAuthContext',state)
   return(
    <DeanAuthContext.Provider value={{...state,dispatch}}>
        {children}
    </DeanAuthContext.Provider>
   )
}