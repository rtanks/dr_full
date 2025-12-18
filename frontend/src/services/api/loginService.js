import axios from 'axios';
import HeaderAuth, { baseUrl } from './headerAndUrlService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal, getShowModal } from '../../slices/modalSlice';
import { getInfo } from '../../slices/requestSlice';

export default function loginService() {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    //-----login--------------------------------------------------------
    const login = async ({fullName, nationalCode, phoneNumber}) => {
        return await axios.post(`${baseUrl}/auth/user/login`, 
            { fullName, nationalCode, phoneNumber } , {
            headers : {
                'Content-Type': 'application/json'
            }
        })
    }
    const initialLoginMutation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            console.log('hi',res.data)
            // window.alert(res.data.otpSend.otp.code)
            Cookies.set('id', res.data.userExisting.data._id);
            dispatch(getInfo({fullName: res.data.userExisting.data.fullName, 
                nationalCode: res.data.userExisting.data.nationalCode, phoneNumber: res.data.userExisting.data.phoneNumber}))
        },
        onError: (err) => {
            console.log(err)
        }
    })
    //-------------login with otp-----------------------------------------------------
    const otpAndEndLogin = async (data) => {
        const response = await axios.post(`${baseUrl}/auth/verify-otp`, data, {headers: {
            'Content-Type': 'application/json',
        }});
        return response;
    }
    const otpAndEndLoginMutation = useMutation({
        mutationFn: otpAndEndLogin, 
        onSuccess: (res) => {
            console.log(res.data.data)
            Cookies.set('accessToken', res.data.token.accessToken);
            Cookies.set('id', res.data.data._id);
            dispatch(getInfo({fullName: res.data.data.fullName, 
                nationalCode: res.data.data.nationalCode, phoneNumber: res.data.data.phoneNumber}))
            dispatch(closeModal())
            queryClient.invalidateQueries([{queryKey: ['qrcode']}])
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const retryOtp = async (data) => {
        const response = await axios.post(`${baseUrl}/auth/retry-otp`, data, {headers: {
            'Content-Type': 'application/json',
        }});
        return response;
    }
    const retryOtpMutation = useMutation({
        mutationFn: retryOtp,
        onSuccess: (res) => {
            console.log(res)
            // window.alert(res.data.otp.code)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    // ------------register------------------------------------------------------------------
    const register = async (data) => {
        const response = await axios.post(`${baseUrl}/auth/user/register`, data, {headers: {
            'Content-Type': 'application/json',
        }});
        return response
    } 
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (res) => {
            console.log(res.data.user);
            Cookies.set('accessToken', res.data.token.accessToken);
            Cookies.set('id', res.data.user._id);
            dispatch(getInfo({fullName: res.data.user.fullName, 
                nationalCode: res.data.user.nationalCode, phoneNumber: res.data.user.phoneNumber}))
            dispatch(closeModal())
            queryClient.invalidateQueries([{queryKey: ['qrcode']}])
        },
        onError: (err) => {
            console.log(err);
        }
    })
    //---------------------edit profile------------------------------
    const {id,headers} = HeaderAuth();
    const edit = async (data) => {
        const response = await axios.patch(`${baseUrl}/users/edit/${id}`, data, {headers});
        return response;
    }
    const editMutation = useMutation({
        mutationFn: edit,
        onSuccess: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err);
        }
    })
    return {initialLoginMutation, otpAndEndLoginMutation, retryOtpMutation, registerMutation, editMutation}
}