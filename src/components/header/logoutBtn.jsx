import { useDispatch } from 'react-redux';
import authService from "../../appwrite/auth"
import {logout} from '../../store/authSlice'

function LogoutBtn(){
    const dispatch = useDispatch();

    const logouthandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        }).catch((err)=>{
            console.log("Error in logoutBtn : " ,err)
        })
    }

    return(
        <button onClick={logouthandler} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-black-700'>
            Logout
        </button>
    )
}

export default LogoutBtn;