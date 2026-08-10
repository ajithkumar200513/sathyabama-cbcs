import {HodAuthContext} from '../Context/HodAuthContext'
import { useContext } from 'react'


export const useHodAuthContext = () =>
{
    const context = useContext(HodAuthContext)
    if(!context)
    {
        throw Error("Error in HodAuthContext")
    }
    return context
}