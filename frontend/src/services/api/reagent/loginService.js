import axios from "axios"
import { baseUrl } from '../headerAndUrlService'
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function loginService() {
    const navigate = useNavigate();

    const login = async (data) => {
        const response = await axios.post(`${baseUrl}/auth/reagent/login`, data, {headers: {
            'Content-Type': 'application/json',
        }})
        return response;
    }
    const loginReagentMutation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            console.log(res);
            Cookies.set('accessToken', res.data.token.accessToken);
            Cookies.set('id', res.data.data._id);
            navigate('/reagent/qrcode')
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return {loginReagentMutation};
}