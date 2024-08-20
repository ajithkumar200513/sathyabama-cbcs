import {DeanAuthContext} from '../Context/DeanAuthContext'
import { useContext } from 'react'


export const UseDeanAuthContext = () =>
{
    const context = useContext(DeanAuthContext)
    if(!context)
    {
        throw Error("Error in DeanAuthContext")
    }
    return context
}