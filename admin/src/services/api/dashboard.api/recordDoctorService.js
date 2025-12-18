import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getDoctors } from "../../../slices/adminSlice";
import headersAndUrlBaseService from "../headersAndUrlBaseService";

export default function recordDoctorService() {
    const queryClient = useQueryClient()
    const dispatch = useDispatch();
    const { baseUrl, headers } = headersAndUrlBaseService();

    const registerDoctor = async (data) => {
        console.log(data)
        const response = await axios.post(`${baseUrl}/doctors/register/`, data);
        return response;
    }
    const registerDoctorMutation = useMutation({
        mutationFn: registerDoctor,
        onSuccess: (res) => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: ['doctors']})
        }, 
        onError: (err) => {
            console.log(err)
        }
    })

    const editDoctor = async ({id, data}) => {
        console.log(id,data)
        const response = await axios.patch(`${baseUrl}/doctors/edit/${id}/`, data, {headers});
        return response;
    }
    const editDoctorMutation = useMutation({
        mutationFn: editDoctor,
        onSuccess: (res) => {
            console.log(res)
            location.reload()
        }, 
        onError: (err) => {
            console.log(err)
        }
    })

    const getDoctorsList = async () => {
        return await axios.get(`${baseUrl}/doctors/list/`, {headers: headers}).then(res => {
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
    return {registerDoctorMutation, editDoctorMutation, getDoctorsList}
}