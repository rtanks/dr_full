import HeaderAuth from "./headerAndUrlService"
import axios from "axios"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import CheckAuth from "../hook/CheckAuth"

export default function userService() {
    const {baseUrl, headers, id} = HeaderAuth()
    const {logout} = CheckAuth();
    const queryClient = useQueryClient();
    const getUser = async () => {
        return await axios.get(`${baseUrl}/users/${id}`, { headers }).then(res => res).catch(err => {
            logout();
            return err;
        });
    }

    const uploadProfileImage = async (formData) => {
        formData.append('userId', id)
        console.log(formData)
        const response = await axios.post(`${baseUrl}/users/profile-image/`, formData, {headers: {
            ...headers, 'Content-Type': 'multipart/form-data'
        }});
        return response;
    }
    const uploadProfileImageMutation = useMutation({
        mutationFn: uploadProfileImage,
        onSuccess: (res) => {
            console.log(res);
            location.reload();
        },
        onError: (err) => {
            console.log(err);
        }
    })
    return {getUser, uploadProfileImageMutation}
}