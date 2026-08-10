import {useStaffAuthContext} from './useStaffAuthContext'
export const useStaffLogout = () =>
{
 const {dispatch} = useStaffAuthContext() 
 const logout =() =>
 {
 localStorage.removeItem('Staff')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
