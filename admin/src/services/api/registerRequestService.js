import axios from "axios";
import headersAndUrlBaseService from "./headersAndUrlBaseService";
import { useMutation } from "@tanstack/react-query";

export default function registerRequestService() {
    const { baseUrl, headers } = headersAndUrlBaseService();

    const registerRequest = async (data) => {
        const response = await axios.post(`${baseUrl}/requests/admin/create`, data, {headers});
        return response;
    } 
    const registerRequestMutation = useMutation({
        mutationFn: registerRequest,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err);
        }
    })

    return {registerRequestMutation};
}