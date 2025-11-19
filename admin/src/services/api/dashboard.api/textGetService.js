import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function testGetService() {
    const dispatch = useDispatch();
    const baseUrl = "https://api.tda24.ir";
    const access = Cookies.get("accessTokenA");
    const headers = {
        "Authorization" : `Bearer ${access}`
    }
    
    const getTestForSeeContent = async () => {
        return await axios.get(`${baseUrl}/adminpanel/dashboard/samplers/`, {headers: headers}).then(res => {
            console.log(res)
            return res;
        }).catch(err => err)
    }
    
    return {getTestForSeeContent}
}