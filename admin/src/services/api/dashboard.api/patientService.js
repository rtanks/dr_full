import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getPatients } from "../../../slices/adminSlice";
import { useState } from "react";
import headersAndUrlBaseService from "../headersAndUrlBaseService";
import { useMutation, useQueryClient } from '@tanstack/react-query'


export default function patientService() {
    const [patientSelected, setPatientSelected] = useState({});
    const dispatch = useDispatch();
    const {baseUrl, headers} = headersAndUrlBaseService();
    const getPatientSelected = (patient) => {
        setPatientSelected(patient)
    }
    const getPatient = async () => {
        return await axios.get(`${baseUrl}/admin/patients/`, headers).then(res => {
            dispatch(getPatients({patients: res?.data?.latest}))
            console.log(res)
            return res
        }).catch(err => {
            // if(err?.status) {
            //     refreshTokenAccess();
            // }
            return err;
        })
    }
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
    //--------------------------------------------------------------
    const queryClient = useQueryClient();
    const editPatient = async (data) => {
        const response = await axios.patch(`${baseUrl}/admin/user/edit/`, {...data}, {headers});
        console.log(response);
        return response
    }
    const editPatientMutation = useMutation({
        mutationFn: editPatient,
        onSuccess: (res) => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: ['patients']});
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const createPatient = async (data) => {
        const response = await axios.post(`${baseUrl}/admin/user/create/`, {...data}, {headers});
        console.log(response);
        return response
    }
    const createPatientMutation = useMutation({
        mutationFn: createPatient,
        onSuccess: (res) => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: ['patients']});
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return {editPatientMutation, createPatientMutation,
        getPatient, getPatientSelected, getPatientHistory}
}