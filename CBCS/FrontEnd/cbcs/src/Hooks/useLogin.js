import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
export const useLogin = () =>
{
const [error,setError] = useState(null)
const [isLoading,setisLoading] = useState(null)
const {dispatch} = useAuthContext()
const login = async(RegNo,password) =>
{
    setisLoading(true)
    setError(null) 
    const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/user/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({RegNo,password})
    }) 
    const json = await response.json()
    if(!response.ok)
    {
        setisLoading(false)
        setError(json)
    }
    if(response.ok)
    {
        localStorage.setItem('user',JSON.stringify(json))
        dispatch({type:'LOGIN',payload:json})
        setisLoading(false)
    }
}
   return {login,error,isLoading }
}
