import axios from "axios";
import CheckAuth from "../hook/CheckAuth";
import HeaderAuth from './headerAndUrlService';
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {v4 as uuidV4} from 'uuid'
import { data, useNavigate } from "react-router-dom";

export default function registerRequestService() {
    const {headers, baseUrl, id:userId} = HeaderAuth();
    const navigate = useNavigate()
    const tempId = uuidV4();
    const initialRegisterRequest = async (data) => {
        console.log({tempId , data})
        const response = await axios.post(`${baseUrl}/requests/create-draft`, {tempId , data}, 
            {headers:{'Content-Type': 'application/json'}});
            // syntax post(url, body,{ header})
        Cookies.set('tempId', tempId);
        return response;
    }
    const initialRegisterRequestMutation = useMutation({
        mutationFn: initialRegisterRequest,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err)
        }
    });

    const transitionToGateway = async ({amount, description}) => {
        console.log(amount, description)
        const response = await axios.post(`${baseUrl}/payment/request`, {userId, amount: +amount, description}, {headers});
        return response;
    }
    const transitionToGatewayMutation = useMutation({
        mutationFn: transitionToGateway,
        onSuccess:(res) => {
            console.log(res);
            location.href = res.data.url;
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const getDataRequestFromDraft = async () => {
        const tempId = Cookies.get('tempId');
        if(tempId) {
            const response = await axios.get(`${baseUrl}/requests/get-draft/${tempId}`, {headers});
            navigate
            return response;
        }
    }
    const registerRequestEnd = async (data) => {
        //data => userId, data, statusPayed, transactionId
        console.log(data)
        const response = await axios.post(`${baseUrl}/requests/create`, {...data}, {headers});
        return response;
    }
    const registerRequestEndMutation = useMutation({
        mutationFn: registerRequestEnd,
        onSuccess: (res) => {
            console.log(res);
            navigate(`/request/${res.data._id}`)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    return {initialRegisterRequestMutation, 
        transitionToGatewayMutation,
        getDataRequestFromDraft,
        registerRequestEndMutation
    }
}