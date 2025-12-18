import axios from "axios";
import HeaderAuth from './headerAndUrlService';
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {  data, useNavigate } from "react-router-dom";

export default function registerRequestService() {
    const {headers, baseUrl} = HeaderAuth();
    const navigate = useNavigate()
    const createRequest = async ({user, request}) => {
        const response = await axios.post(`${baseUrl}/users/create-user/request/`, {user, request}, {headers});
        console.log(response); 
        return(response);
    }
    const createRequestMutation = useMutation({
        mutationFn: createRequest,
        onSuccess: (res) => {
            console.log('success', res);
            console.log('success', res.data.request._id);
            Cookies.set('requestId', res.data.request._id);
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })
    //---------------Update Request----------------------
    const updateRequest = async ({id, data}) => {
        const response = await axios.patch(`${baseUrl}/requests/update/${id}/`, {...data}, {headers})
        return response;
    }
    const updateRequestMutation = useMutation({
        mutationFn: updateRequest,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const updateRequestAllData = async (data) => {
        console.log(data)
        const response = await axios.patch(`${baseUrl}/users/update-user/`, data, {headers});
        return(response);
    }
    const updateRequestAllDataMutation = useMutation({
        mutationFn: updateRequestAllData,
        onSuccess: (res) => {
            console.log('successUpdate', res);
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const updateRequestType = async (id) => {
        console.log(id)
        const response = await axios.patch(`${baseUrl}/requests/type/request-update/${id}/`, {headers});
        return response;
    }
    const updateRequestTypeMutation = useMutation({
        mutationFn: updateRequestType,
        onSuccess: (res) => {
            console.log('successUpdate type', res);
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })
    //-----------delete request-----------------------
    const removeRequest = async (id) => {
        const response = axios.delete(`${baseUrl}/requests/delete-request/${id}/`, {headers});
        return response;
    }
    const removeRequestMutation = useMutation({
        mutationFn: removeRequest,
        onSuccess: (res) => {
            console.log(res)
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })



    return {createRequestMutation, updateRequestMutation, 
        updateRequestAllDataMutation, updateRequestTypeMutation, 
        removeRequestMutation}
}