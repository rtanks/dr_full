import axios from "axios"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux";
import { getWithdrawals } from "../../../slices/adminSlice";

export default function requestWithdrawService() {
    const baseUrl = "https://api.tda24.ir";
    const access = Cookies.get("accessTokenA");
    const headers = {
        "Authorization" : `Bearer ${access}`
    }

    const dispatch = useDispatch()

    const getListWithdrawRequest = async () => {
        try {
            const response = await axios.get(`${baseUrl}/adminpanel/adminpanel/withdrawals/`, {headers: headers});
            console.log(response?.data);
            dispatch(getWithdrawals(response?.data));
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    const approveRequest = async ({id}) => {
        const response = await axios.post(`${baseUrl}/adminpanel/adminpanel/withdrawals/${id}/approve/`, {trx_id: id}, {headers:headers})
        return response;
    }
    const rejectRequest = async ({id}) => {
        const response = await axios.post(`${baseUrl}/adminpanel/adminpanel/withdrawals/${id}/reject/`, {trx_id: id}, {headers:headers})
        return response;
    }
    return {getListWithdrawRequest, approveRequest, rejectRequest}
}