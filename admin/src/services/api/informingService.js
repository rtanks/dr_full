import axios from "axios";
import headersAndUrlBaseService from "./headersAndUrlBaseService"
import { useMutation } from "@tanstack/react-query";

export default function informingService() {
    const {baseUrl, headers} = headersAndUrlBaseService();

    const createMessage = async (data) => {
        const response = await axios.post(`${baseUrl}/message/create`, data, {headers});
        return response;
    }
    const createMessageMutation = useMutation({
        mutationFn: createMessage,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return {createMessageMutation}
}