import HeaderAuth from "./headerAndUrlService"
import axios from "axios"

export default function userService() {
    const {baseUrl, headers, id} = HeaderAuth()

    const getUser = async () => {
        return await axios.get(`${baseUrl}/users/${id}`, { headers });
    }
    return {getUser}
}