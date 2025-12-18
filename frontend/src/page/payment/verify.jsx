import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import HeaderAuth from '../../services/api/headerAndUrlService';
import SuccessTransAction from '../../components/payment/SuccessTransaction';
import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import FailedTransAction from '../../components/payment/FailedTransaction';
import { convertDateToLocalFormat } from '../../services/func/transformDate';
import CanceledTransAction from '../../components/payment/CanceledTransaction';
import Loading from '../../components/Loading';

export default function Verify() {
    const {baseUrl, headers, id:userId} = HeaderAuth();
    const [dataTransaction, setDataTransaction] = useState({})

    const param = new URLSearchParams(location.search);
    const status = param.get('Status');
    const authority = param.get('Authority');
    const amount = param.get('amount');

    const {data, isLoading, isPending} = useQuery({queryKey: ['verifyPayment'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/payment/verify/?Amount=${amount}&Authority=${authority}&Status=${status}`,{headers});
        console.log(response);
        return response.data;
    }})

    useEffect(() => {
        if(!isPending) {
            console.log(data)
            const {time, dateValue} = convertDateToLocalFormat(data.date);
            setDataTransaction({...data, time, dateValue});
        }
    }, [data])
    if(isLoading) return <Loading/>
    return(
        <div className="w-full h-full bg-[#f0f2f5] px-5 flex justify-center py-5">
            <div className={`status-box success-page border-t-[5px] ${dataTransaction.code == 100 || dataTransaction.code == 101 ? "border-t-success": "border-t-failed"}`}>
                {
                    
                        dataTransaction.code == 100 || dataTransaction.code == 101 ? (
                            <SuccessTransAction data={dataTransaction} amount={amount} userId={userId}/>
                        ):(
                            dataTransaction.code == 0 ? (
                                <CanceledTransAction data={dataTransaction} amount={amount} userId={userId}/>
                            ) : (
                                <FailedTransAction data={dataTransaction} amount={amount} userId={userId}/>
                            )
                        )
                    
                }
            </div>
        </div>
    )
}