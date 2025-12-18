import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function CheckAuth() {
    const navigate = useNavigate();

    const checkAuthUser = () => {
        const accessToken = Cookies.get('accessToken');
        if(accessToken) {
            return true;
        } else {
            return false;
        }
    }
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('id');
        Cookies.remove('tempId');
        // localStorage.removeItem('order');
        navigate('/')
        location.reload();
    }

    const checkForMyself = () => {
        const request = JSON.parse(localStorage.getItem('order'));
        const myself = request.step1.myself;
        return myself;
    }
    return {checkAuthUser, logout, checkForMyself}
}