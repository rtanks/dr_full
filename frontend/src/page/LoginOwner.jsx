import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import loginService from "../services/api/loginService";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/request/Inputs";
import axios from 'axios'
import {useMutation} from '@tanstack/react-query'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import HeaderAuth from "../services/api/headerAndUrlService";
import { getInfo } from "../slices/requestSlice";

const schema = z.object({
  phoneNumber: z.string().nonempty("وارد کردن این فیلد الزامی است").regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست"),
})

export default function LoginOwner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {baseUrl} = HeaderAuth();
  const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues:{
      nationalCode: "",
    }
  })
  const disabledClass = classNames({
    "bg-[#006ECF] text-white": isValid,
    "bg-gray-200 text-gray-500": !isValid,
    });
    const loginWithPhoneNumber = async (data) => {
        const response = await axios.post(`${baseUrl}/auth/login/phone-number/`, data, {headers: {
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
    
    const onSubmit = (data) => {
      console.log(data)
      loginWithPhoneNumberMutation.mutate(data)
    }
  
  return (
    <div className="w-full h-full flex justify-center items-center">

      <form onSubmit={handleSubmit(onSubmit)}  className="w-full sm:w-[402px] h-max">
        <Input register={register("phoneNumber")} type={"text"} placeholder={"شماره تلفن"} maxLength={11} mode={"numeric"}/>

        <button type="submit" className={`w-full py-2 rounded-xl ${disabledClass} mt-6`}>ورود</button>
      </form>
    </div>
  );
}
