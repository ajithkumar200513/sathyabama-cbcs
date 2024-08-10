import {useHodAuthContext} from './useHodAuthContext'
export const useHodLogout = () =>
{
 const {dispatch} = useHodAuthContext() 
 const logout =() =>
 {
 localStorage.removeItem('HOD')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
