import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserAdmin } from "../../slices/adminSlice"

export default function loginService () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseUrl = "https://api.tda24.ir";
    const header = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true 
    }
    const loginAdmin = async ({phoneNumber, password}) => {
            console.log(phoneNumber, password)
            const response = await axios.post(`${baseUrl}/adminpanel/login-admin/`,
                {phoneNumber: phoneNumber, password: password}, header);
            return response;
        }
    const loginAdminMutation  = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (res) => {
            console.log(res.data)
            if(res.data.access) {
                const {access, refresh} = res?.data;
                Cookies.set("accessTokenA", access, {expires: 1761075419});
                Cookies.set("refreshTokenA", refresh, {expires: 1761939419});
                dispatch(getUserAdmin({user: res?.data?.user}));
                navigate("/dashboard/need-for-action");
            }
        }, 
        onError: (err) => {
            console.log(err)
        }
    })
    
    return {loginAdminMutation}
}