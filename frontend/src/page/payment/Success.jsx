import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import HeaderAuth from '../../services/api/headerAndUrlService'
import { convertDateToLocalFormat } from '../../services/func/transformDate'
import { useEffect, useState } from 'react'
import registerRequestService from '../../services/api/registerRequestService'
export default function Success() {
    const {baseUrl, headers, id:userId} = HeaderAuth()
    const [dataTransaction, setDataTransaction] = useState({})
    const param = new URLSearchParams(location.search)
    const id = param.get('id');
    const {data, isLoading, isSuccess, isPending} = useQuery({queryKey: ['transactionResult'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/payment/${id}`, {headers});
        return response;
    }})
    useEffect(() => {
        if(!isPending) {
            console.log(data)
            const {time, dateValue} = convertDateToLocalFormat(data.data.createdAt)
            setDataTransaction({refId: data.data.refId, time: time, date: dateValue});
            console.log(convertDateToLocalFormat(data.data.createdAt))
        }

    },[data])
    const {getDataRequestFromDraft, registerRequestEndMutation} = registerRequestService();
    const onClickHandler =  async () => {
        await getDataRequestFromDraft().then(res => {
            console.log({userId ,data: res.data, statusPay: data.data.payed, transactionId: id})
            const dataRequest = {userId, request: res.data, statusPay: data.data.payed, transactionId: id}
            registerRequestEndMutation.mutate(dataRequest)
        });
    }
    if(isLoading) return <p>isLoading....</p>

    return (
        <div className="w-full h-full flex justify-center">
            <div className='w-full sm:w-[402px] mt-[10%] h-max py-[7%] px-[5%] flex flex-col gap-2 items-center'>
                <div className='w-full border-b-2 border-zinc-200 text-center h-10 font-bold'>گزارش تراکنش</div>
                <div className='w-full pt-3 text-center h-12 text-green-600 mb-4'>تراکنش موفق</div>
                <div className='w-full h-max flex flex-col gap-2 mb-14'>
                    <div className='w-full flex flex-row gap-5 justify-between'>
                        <span>تاریخ :</span>
                        <span className='w-max flex flex-row gap-2'>
                            <span className='w-max'>
                                {dataTransaction.time}
                            </span>
                            {dataTransaction.date}
                        </span>
                    </div>
                    <div className='w-full flex flex-row gap-5 justify-between'>
                        کد پیگیری:
                        <span>
                            {dataTransaction.refId}
                        </span>
                    </div>
                </div>
                <button onClick={onClickHandler} className='w-full bg-main text-white py-2 rounded-xl'>بازگشت</button>
            </div>
        </div>
    )
}