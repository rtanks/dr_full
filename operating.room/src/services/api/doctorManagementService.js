import axios from "axios";
import HeaderAuth from "./headerAndUrlService"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function doctorManagementService() {
    const { baseUrl, headers } = HeaderAuth();
    const queryClient = useQueryClient();

    const updateActivate = async ({id, status}) => {
        console.log(status)
        const response = await axios.patch(`${baseUrl}/hospital/update/doctor/activate/`, {doctorId: id,activate: status}, {headers});
        return response;
    }
    const updateActivateMutation = useMutation({
        mutationFn: updateActivate,
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries([{queryKey: ['doctorsHospital']}])
            // location.reload();
        }, 
        onError: (err) => {
            console.log(err);
        }
    })

    const addDoctor = async (data) => {
        const response = await axios.post(`${baseUrl}/hospital/add/doctor/`, data, {headers});
        return response;
    }
    const addDoctorMutation = useMutation({
        mutationFn: addDoctor,
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries({queryKey: ['doctorsHospital']})
        },
        onError: (err) => {
            console.log(err)
        }
    })
    
    const deleteDoctor = async ({id}) => {
        const response = await axios.delete(`${baseUrl}/hospital/delete/doctor/${id}/`, {headers});
        return response;
    }
    const deleteDoctorMutation = useMutation({
        mutationFn: deleteDoctor,
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries({queryKey: ['doctorsHospital']})
        },
        onError: (err) => {
            console.log(err)
        }
    })


    return {updateActivateMutation, addDoctorMutation, deleteDoctorMutation}
}