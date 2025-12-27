import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import headersAndUrlBaseService from "./headersAndUrlBaseService"
// import { getUserAdmin } from "../../slices/adminSlice"
// import Cookies from "js-cookie"

export default function loginService () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {baseUrl, headers} = headersAndUrlBaseService();
    const loginAdmin = async ({nationalCode, password}) => {
            console.log(nationalCode, password)
            const response = await axios.post(`${baseUrl}/admin/login/`,
                {nationalCode: nationalCode, password: password}, {headers});
            return response;
        }
    const loginAdminMutation  = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (res) => {
            console.log(res.data)
            // if(res.data.access) {
                // const {access, refresh} = res?.data;
                // Cookies.set("accessTokenA", access, {expires: 1761075419});
                // Cookies.set("refreshTokenA", refresh, {expires: 1761939419});
                // dispatch(getUserAdmin({user: res?.data?.user}));
                navigate("/dashboard/need-for-action");
            // }
        }, 
        onError: (err) => {
            console.log(err)
        }
    })
    
    return {loginAdminMutation}
}