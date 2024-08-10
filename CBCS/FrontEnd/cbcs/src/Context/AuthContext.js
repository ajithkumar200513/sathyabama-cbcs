import { createContext,useReducer,useEffect } from "react";
export const AuthContext = createContext()

const authreducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
           return  {user:null}   
        default:
            return state
    }
}
export const AuthContextProvider = ({children}) =>
{
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if(user)
        {
            dispatch({type:'LOGIN',payload:user})
        }
    },[])
   const [state,dispatch] = useReducer(authreducer,{
    user:null
   })
   console.log('AuthContext',state)
   return(
    <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
   )
}