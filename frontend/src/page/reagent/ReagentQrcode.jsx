import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../../services/api/headerAndUrlService"
import axios from "axios";
import Cookies from "js-cookie";

export default function ReagentQrcode() {
    const {baseUrl, headers} = HeaderAuth();
    const id = Cookies.get('id');

    const {data, isLoading} = useQuery({queryKey: ['qrcode'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/reagent/qr/${id}`, { headers, responseType: "blob" })
        console.log(response);
        return URL.createObjectURL(response.data);
    }})

    if(isLoading) return <p>isLoading</p>
    return (
        <div className="w-full h-full flex justify-center items-center bg-white">
            <img src={data}/>
        </div>
    )
}