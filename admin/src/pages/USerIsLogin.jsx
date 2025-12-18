import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'

export default function UserIsLogin() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen flex flex-col gap-7 justify-center items-center">
            <div className="w-max h-max text-md sm:text-xl text-[#585858] vazir-medium text-center">شما قبلاً وارد حساب کاربری خود شده‌اید<br/>
                نیازی به ورود مجدد نیست</div> 
            <button type="button" onClick={() => {Cookies.remove('accessTokenA','refreshTokenA');Cookies.remove('refreshTokenA');navigate('/');window.history.go(0)}} 
                className="bg-[#006ECF] text-white px-10 py-2 text-sm sm:text-md rounded-lg">خروج از حساب کاربری</button>
        </div>
    )
}