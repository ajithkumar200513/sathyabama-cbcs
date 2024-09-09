import { useCoeAuthContext } from "./UseCoeAuthContext";
import { useState } from "react";
export const useCoeLogin = () =>
{
const [error,setError] = useState(null)
const [isLoading,setisLoading] = useState(null)
const {dispatch} = useCoeAuthContext()
const login = async(Email,password) =>
{
    setisLoading(true)
    setError(null) 
    const response = await fetch('https://sathyabama-cbcs.onrender.com/cbcs/COE/Login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({Email,password})
    }) 
    const json = await response.json()
    if(!response.ok)
    {
        setisLoading(false)
        setError(json)
    }
    if(response.ok)
    {
        localStorage.setItem('COE',JSON.stringify(json))
        dispatch({type:'LOGIN',payload:json})
        setisLoading(false)
    }
}
   return {login,error,isLoading }
}
