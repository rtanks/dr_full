import { ImCross } from "react-icons/im";
import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderAuth from "../../services/api/headerAndUrlService";
import Cookies from "js-cookie";
import LoadingMini from "../LoadingMini";
import { convertDateToLocalFormat } from "../../services/func/transformDate";
import { transformFormatWithSpread } from "../../services/func/transformFunc";

export default function HistoryModalContainer({close}) {
    const { headers, baseUrl } = HeaderAuth();
    const [historyData, setHistoryData] = useState({})
    const {data, isLoading, isPending} = useQuery({queryKey: ["history"], queryFn: async () => {
        const idHistory = Cookies.get('idHistory')
        const response = await axios.get(`${baseUrl}/requests/${idHistory}`,{headers});
        console.log(response)
        return response.data;
    }})
    useEffect(() => {
        if(!isPending) {
            console.log(data);
            console.log("first", {...data, 
                date: convertDateToLocalFormat(data.createdAt).dateValue,
                time: convertDateToLocalFormat(data.createdAt).time})
            setHistoryData({...data, 
                date: convertDateToLocalFormat(data.createdAt).dateValue,
                time: convertDateToLocalFormat(data.createdAt).time});
        }
    }, [data])
    if(isLoading) return <LoadingMini/>
    return (
        <div onClick={close} className="w-full h-full flex justify-center absolute left-0 top-0 bg-[#0009]">

            <div onClick={(e) => e.stopPropagation()} className="w-[96%] sm:w-[40%] h-max mt-10 p-2 sm:p-5 sm:items-center rounded-xl bg-white flex flex-col pb-1">
                <div className='w-full h-max text-left px-1 sm:px-5 pt-2'>
                    <button onClick={close} type='button'>
                        <ImCross size={15} color='#ddd'/>
                    </button>
                </div>
                <div className="w-full h-max flex flex-col gap-5 pb-4 px-2">
                    <div className="w-max gap-2 h-max font-bold text-lg">درخواست {historyData?.request?.service}</div>
                    <div className={`w-full sm:w-1/2 gap-2 flex flex-row justify-between ${historyData?.statusPay? "text-success": "text-failed"}`}>
                        <span className="w-max h-max text-black font-bold"> وضعیت : </span>
                        {historyData?.statusPay? "پرداخت شده":  "پرداخت نشده"}
                    </div>
                    <div className="w-full sm:w-1/2 gap-2 h-max flex flex-row justify-between">
                        <div className="w-max h-max font-bold">زمان:</div>
                        <div className="w-max h-max flex flex-row gap-4 items-center text-898989">
                            <span>{historyData?.time}</span>
                            <span>{historyData?.date}</span>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 h-max flex flex-row justify-between items-center gap-1">
                        <div className="font-bold">مبلغ پرداخت شده:</div>
                        <div className="w-max h-max text-898989 flex flex-row gap-1 px-1">{transformFormatWithSpread(historyData?.request?.price)} ریال</div>
                    </div>
                    <div className="w-full h-max flex flex-col gap-1">
                        <div className="font-bold">نواحی انتخاب شده:</div>
                        <div className="w-full h-max text-898989 flex flex-row flex-wrap gap-1 px-1">
                        {historyData?.request?.area.map((item,index) => index == 0? <span>{item}</span>: <span>, {item}</span>)}
                        </div>
                    </div>
                    <div className="w-full h-max flex flex-col gap-0.5">
                        <div className="font-bold">توضیحات:</div>
                        <p className="w-full wrap-break-word h-max text-898989 rounded-xl p-1">{historyData?.request?.explain}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}