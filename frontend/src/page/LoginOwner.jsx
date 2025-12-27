import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import z from "zod";
import axios from 'axios'
import {useMutation} from '@tanstack/react-query'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import HeaderAuth from "../services/api/headerAndUrlService";
import { getInfo } from "../slices/requestSlice";
import { useState } from "react";
import SearchWithCp from "../components/searchs/SearchWithCp";
const schema = z.object({
  phoneNumber: z.string().nonempty("وارد کردن این فیلد الزامی است").regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست"),
})

export default function LoginOwner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {baseUrl} = HeaderAuth();
  const [userSelected, setUserSelected] = useState({});
  const getUser = (user) => {
    setUserSelected(user);
  }
  const disabledClass = classNames({
    "bg-[#006ECF] text-white": userSelected,
    "bg-gray-200 text-gray-500": !userSelected,
  });
  const loginWithPhoneNumber = async ({phoneNumber}) => {
    const response = await axios.post(`${baseUrl}/auth/login/phone-number/`, {phoneNumber}, {headers: {
        'Content-Type': 'application/json',
    }})
    return response;
  }
    const loginWithPhoneNumberMutation = useMutation({
        mutationFn: loginWithPhoneNumber, 
        onSuccess: (res) => {
            console.log(res.data.data)
            Cookies.set('accessToken', res.data.token.accessToken);
            Cookies.set('id', res.data.data._id);
            dispatch(getInfo({fullName: res.data.data.fullName, 
                nationalCode: res.data.data.nationalCode, phoneNumber: res.data.data.phoneNumber}))
                navigate('/')
            },
            onError: (err) => {
                console.log(err)
            }
        })
    
    const onSubmit = () => {
      console.log(userSelected)
      loginWithPhoneNumberMutation.mutate({phoneNumber: userSelected.phoneNumber})
    }
  
  return (
    <div className="w-full h-screen flex justify-center items-center z-50">
      <div  className="px-5 w-full sm:w-[402px] h-max">
        <SearchWithCp getUser={getUser}/>
        <button type="button" onClick={onSubmit} className={`w-full h-12 py-2 rounded-xl ${disabledClass} mt-6`}>ورود</button>
      </div>
    </div>
  );
}
