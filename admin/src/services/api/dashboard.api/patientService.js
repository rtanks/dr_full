import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getPatients } from "../../../slices/adminSlice";
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function patientService() {
    const [patientSelected, setPatientSelected] = useState({});
    const dispatch = useDispatch();
    const baseUrl = "http://localhost:5000/users";
    // const baseUrl = "http://192.168.88.187:5000/users";
    const access = Cookies.get("accessTokenA");
    const headers = {
        "Authorization" : `Bearer ${access}`
    }
    
    const queryClient = useQueryClient();

    const getPatientSelected = (patient) => {
        setPatientSelected(patient)
    }
    const getPatient = async () => {
        const response = await axios.get(baseUrl).then(res => {
            dispatch(getPatients({patients: res?.data?.data}));
            console.log(res);
            return res;
        }).catch(err => {
            console.log(err);
            return err;
        })
        return response;
    }

    const editUser = async ({id,data}) => {
        const response = await axios.patch(`${baseUrl}/edit/${id}`, data);
        return response;
    }
    const editUserMutation = useMutation({
        mutationFn: editUser,
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries({queryKey: ['patients']})
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const createUser = async (data) => {
        const response = await axios.post(`${baseUrl}/register`, data);
        return response;
    }
    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (res) => {
            console.log(res);
            queryClient.invalidateQueries({queryKey: ['patients']});
        },
        onError: (err) => {
            console.log(err)
        }
    })



    const getPatientHistory = async () => {
        return await axios.get(`${baseUrl}/adminpanel/patients/${patientSelected?.id}/history/`, {headers: headers}).then(res => {
            console.log(res);
            return res;
        }).catch(err => {
            console.log(err)
            return err;
        })
    }


    // const refreshTokenAccess = async () => {
    //     const refreshTokenA = Cookies.get("refreshTokenA")

    // }
    return {getPatient, editUserMutation, createUserMutation, getPatientSelected, getPatientHistory}
}