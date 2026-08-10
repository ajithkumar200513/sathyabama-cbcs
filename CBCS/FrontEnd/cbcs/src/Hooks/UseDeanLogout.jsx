import {UseDeanAuthContext} from './UseDeanAuthContext'
export const UseDeanLogout = () =>
{
 const {dispatch} = UseDeanAuthContext() 
 const logout =() =>
 {
 localStorage.removeItem('DEAN')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
