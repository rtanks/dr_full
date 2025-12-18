import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../../services/api/headerAndUrlService"
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../Loading";
import { LuCopy } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { MdOutlineDone } from "react-icons/md";

export default function QrCode() {
    const [copy, setCopy] =  useState({item: '', status: false});
    const info = useSelector(state => state.request)
    const {baseUrl, headers, frontBaseUrl} = HeaderAuth();
    const id = Cookies.get('id');

    const {data, isLoading} = useQuery({queryKey: ['qrCode'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/users/qr/${id}`, { headers, responseType: "blob" })
        console.log(response)
        return URL.createObjectURL(response.data);
    }})
    console.log(data)
    // if(isLoading) return <Loading/>
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setCopy({item: '', status: false})
        },2000);
        return () => clearTimeout(timeOut);
    }, [copy])
    return (
        <div className="w-full h-max flex flex-col gap-5 my-2 p-2 justify-center items-center bg-transparent rounded-xl">
            <div className="w-full h-max bg-white p-3.5 rounded-xl">
                <img src={data} className="w-full h-max"/>
            </div>
            <div className={`w-full h-max flex flex-col gap-2 px-1 ${info.nationalCode == undefined ? "text-a7a7a7": "text-676767"}`}>
                <div title={`${frontBaseUrl}/${info.nationalCode}`} className="w-full h-max text-sm font-bold flex flex-row items-center justify-between">
                    <span>اسکن یا کپی لینک معرف</span>
                    {
                        copy.item == 'link' && copy.status ? (
                            <motion.span animate={{scale: [0,1], transition: {duration: 0.5}}}>
                                <MdOutlineDone size={19}/>
                            </motion.span>
                        ) : (

                            <LuCopy size={19} onClick={(e) => {
                                console.log(e.target.parentElement); 
                                navigator.clipboard.writeText(e.target.parentElement.title);
                                setCopy({item: "link", status: true})
                            }}/>
                        )
                    }
                </div>
                <div title={info.nationalCode} className={`w-full h-max text-sm font-bold flex flex-row items-center justify-between`}>
                    <span>کد معرف : </span>
                    <span>{info.nationalCode}</span>
                    {
                        copy.item == 'code' && copy.status ? (
                            <motion.span animate={{scale: [0,1], transition: {duration: 0.5}}}>
                                <MdOutlineDone size={19}/>
                            </motion.span>
                        ) : (

                            <LuCopy size={19} onClick={(e) => {
                                console.log(e.target);
                                navigator.clipboard.writeText(e.target.parentElement.title);
                                setCopy({item: 'code', status: true})
                            }}/>
                        )
                    }
                </div>
                <p className="text-sm mt-1 text-justify">بارکد و لینک خود را در اختیار دوستانتان قرار دهید</p>
                <p className="text-sm text-justify">%10 مبالغ پداختی دوستان به شما برگشت داده میشود و 10% دوستتان کمتر پرداخت میکند </p>
            </div>
        </div>
    )
}