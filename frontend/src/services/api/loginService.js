import axios from 'axios';
import { baseUrl } from './headerAndUrlService';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal, getShowModal } from '../../slices/modalSlice';
import { getInfo } from '../../slices/requestSlice';

export default function loginService() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async ({nationalCode}) => {
        return await axios.post(`${baseUrl}/auth/user/login`, { nationalCode },{
            headers : {
                'Content-Type': 'application/json'
            }
        })
    }
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            console.log(res)
            console.log(res.data.token)
            Cookies.set('accessToken', res.data.token.accessToken);
            Cookies.set('id', res.data.data._id);
            dispatch(getInfo({fullName: res.data.data.fullName, nationalCode: res.data.data.nationalCode, phoneNumber: res.data.data.phoneNumber}))
            dispatch(closeModal());
            location.reload();
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const register = async (data) => {
        const response = await axios.post(`${baseUrl}/auth/user/register`, data,{headers: {
            'Content-Type': 'application/json',
        }});
        return response;
    }
    const registerMutation = useMutation({
        mutationFn: register, 
        onSuccess: (res) => {
            console.log(res)
            dispatch(getShowModal('login'))
        },
        onError: (err) => {
            console.log(err)
        }
    })
    return {loginMutation, registerMutation}
}