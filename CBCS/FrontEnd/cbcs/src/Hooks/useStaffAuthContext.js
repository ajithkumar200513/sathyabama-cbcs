import {StaffAuthContext} from '../Context/StaffAuthContext'
import { useContext } from 'react'


export const useStaffAuthContext = () =>
{
    const context = useContext(StaffAuthContext)
    if(!context)
    {
        throw Error("Error in StaffAuthContext")
    }
    return context
}