import axios from "axios";
import CheckAuth from "../hook/CheckAuth";
import HeaderAuth from './headerAndUrlService';
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export default function registerRequestService() {
    const { checkForMyself } = CheckAuth();
    const {headers, baseUrl} = HeaderAuth();

    const registerRequest = async (data) => {
        const userId = Cookies.get('_id');
        if(checkForMyself()) {
            console.log({ userId , service: data.service, title: data.title, explain: data.explain , center: data.center})
            const response = await axios.post(`${baseUrl}/requests/create`, 
                { userId , service: data.service, title: data.title, explain: data.explain , center: data.center}, {headers:headers});
                // syntax post(url, body,{ header})
                
            return response;
        } else {
            const response = await axios.post(`${baseUrl}/users/register-others`, 
                data, {headers:headers});
            return response;
        }
    }
    const registerRequestMutation = useMutation({
        mutationFn: registerRequest,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err)
        }
    });

    return {registerRequestMutation}
}