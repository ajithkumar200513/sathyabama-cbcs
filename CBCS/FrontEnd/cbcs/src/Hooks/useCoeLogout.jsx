import {useCoeAuthContext} from './UseCoeAuthContext'
export const useCoeLogout = () =>
{
 const {dispatch} = useCoeAuthContext();
 const logout =() =>
 {
 localStorage.removeItem('coe')
 dispatch({type:'LOGOUT'})
}
return({logout})
}
