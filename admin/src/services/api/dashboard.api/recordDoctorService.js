import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getDoctors } from "../../../slices/adminSlice";

export default function recordDoctorService() {
    const dispatch = useDispatch();
    const baseUrl = "https://api.tda24.ir";
    const access = Cookies.get("accessTokenA");
    const headers = {
        "Authorization" : `Bearer ${access}`
    }
    const recordDoctor = async (data) => {
        console.log(data)
        const response = await axios.post("https://api.tda24.ir/doctors/register/", data);
        return response;
    }
    const recordDoctorMutation = useMutation({
        mutationFn: recordDoctor,
        onSuccess: (res) => {
            console.log(res)
        }, 
        onError: (err) => {
            console.log(err)
        }
    })

    const getDoctorsList = async () => {
        return await axios.get(`${baseUrl}/adminpanel/dashboard/doctors/`, {headers: headers}).then(res => {
            dispatch(getDoctors({doctors: res?.data?.latest}))
            console.log(res.data.latest);
            return res;
        }).catch(err => {
            console.log(err)
            return err;
        })
    }
    
    // const getCommission = async ({commission}) => {
    //     const response = await axios.post(`${baseUrl}`)
    // }
    return {recordDoctorMutation, getDoctorsList}
}