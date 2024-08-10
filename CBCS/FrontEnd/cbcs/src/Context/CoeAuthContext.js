import { createContext,useReducer,useEffect } from "react";
export const CoeAuthContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {COE:action.payload}
        case 'LOGOUT':
           return  {COE:null}   
        default:
            return state
    }
}
export const CoeAuthContextProvider = ({children}) =>
{
    useEffect(() => {
        const coe = JSON.parse(localStorage.getItem('COE'))
        console.log(coe)
        if(coe)
        {
            dispatch({type:'LOGIN',payload:coe})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    COE:null
   })
   console.log('CoeAuthContext',state)
   return(
    <CoeAuthContext.Provider value={{...state,dispatch}}>
        {children}
    </CoeAuthContext.Provider>
   )
}