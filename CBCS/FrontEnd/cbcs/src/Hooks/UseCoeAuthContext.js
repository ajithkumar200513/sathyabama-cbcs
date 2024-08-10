import {CoeAuthContext} from '../Context/CoeAuthContext'
import { useContext } from 'react'


export const useCoeAuthContext = () =>
{
    const context = useContext(CoeAuthContext)
    if(!context)
    {
        throw Error("Error in CoeAuthContext")
    }
    return context
}