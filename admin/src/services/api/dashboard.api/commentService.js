import axios from "axios";
import Cookies from "js-cookie";

export default function commentService() {
    const baseUrl = "https://api.tda24.ir";
    const access = Cookies.get("accessTokenA");
    const headers = {
        "Authorization" : `Bearer ${access}`
    }

    const getComments = async () => {
        return await axios.get(`${baseUrl}/adminpanel/dashboard/feedbacks/`, {headers: headers}).then(res => {
            console.log(res);
            return res;
        }).catch(err => {
            return err;
        })
    }


    return {getComments}
}