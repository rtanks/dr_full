import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import HeaderAuth from "./headerAndUrlService"

export default function loginService () {
    const navigate = useNavigate();
    const {baseUrl, headers} = HeaderAuth();
    const loginDoctor = async ({nationalCode, password}) => {
            console.log(nationalCode, password)
            const response = await axios.post(`${baseUrl}/doctors/login/`,
                {nationalCode: nationalCode, password: password}, {headers});
            return response;
        }
    const loginDoctorMutation  = useMutation({
        mutationFn: loginDoctor,
        onSuccess: (res) => {
            console.log(res.data)
            // if(res.data.access) {
                // const {access, refresh} = res?.data;
                // Cookies.set("accessTokenA", access, {expires: 1761075419});
                // Cookies.set("refreshTokenA", refresh, {expires: 1761939419});
                // dispatch(getUserDoctor({user: res?.data?.user}));
                navigate("/dr");
            // }
        }, 
        onError: (err) => {
            console.log(err)
        }
    })
    
    return {loginDoctorMutation}
}