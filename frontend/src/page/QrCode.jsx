import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../services/api/headerAndUrlService"
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../components/Loading";

export default function QrCode() {
    const {baseUrl, headers} = HeaderAuth();
    const id = Cookies.get('id');

    const {data, isLoading} = useQuery({queryKey: ['qrcode'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/users/qr/${id}`, { headers, responseType: "blob" })
        return URL.createObjectURL(response.data);
    }})
    console.log(data)
    if(isLoading) return <Loading/>
    return (
        <div className="w-full h-full flex justify-center items-center bg-white rounded-xl">
            <img src={data}/>
        </div>
    )
}