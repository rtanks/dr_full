import { useEffect, useState } from "react";
import HeaderRequestStatus from "../components/request/HeaderRequestStatus";
import HeaderAuth from "../services/api/headerAndUrlService";
import { useQuery } from "@tanstack/react-query";
import { convertDateToLocalFormat } from "../services/func/transformDate";
import { getKeyRequestWithService, getServiceRequest, getTypeRequest } from "../services/func/getTypeRequest";
import { transformFormatWithSpread } from "../services/func/transformFunc";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingMini from "../components/LoadingMini";
import NoRequest from "../components/general/NoRequest";
import RequestParaClinic from "../components/request/request-category/RequestParaClinic";
import RequestDoctor from "../components/request/request-category/RequestDoctor";

export default function Request() {
    const { headers, baseUrl } = HeaderAuth();
    const [historyData, setHistoryData] = useState({})
    const {id} = useParams()
    const {data, isLoading, isPending, isError} = useQuery({queryKey: ["history"], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/requests/${id}`,{headers});
        return response.data;
    }})
    const categoryRequest = (dataTarget) => {
        switch(dataTarget.category) {
            case 'paraClinic':
            case 'test': 
            case 'medicine':
                return <RequestParaClinic data={dataTarget}/>;
            case 'doctorConsulting': return <RequestDoctor data={dataTarget}/>
            default: return ''
        }
    }
    useEffect(() => {
        if(!isPending) {
            console.log(data);
            console.log("first", {...data, 
                date: convertDateToLocalFormat(data?.createdAt).dateValue,
                time: convertDateToLocalFormat(data?.createdAt).time})
            setHistoryData({...data, 
                date: convertDateToLocalFormat(data?.createdAt).dateValue,
                time: convertDateToLocalFormat(data?.createdAt).time});
        }
    }, [data])
    if(isLoading && id) return <LoadingMini/>
    return (
        <div className="w-full h-full flex flex-col gap-1">
            {
                data ? (
                    <>
                        <HeaderRequestStatus typeRequest={getServiceRequest(historyData?.request?.service)} titleRequest={'تکمیل نشده / نیاز به پرداخت'} 
                        statusRequest={historyData?.statusPay? "پرداخت شده":  "پرداخت نشده"} keyRequest={getKeyRequestWithService(historyData?.request?.service)} 
                        date={historyData?.date} time={historyData?.time} />
                        <div className='bg-white w-full h-full rounded-2xl p-5 sm:px-4 pb-2'>
                            {
                                categoryRequest(data)
                            }
                        </div>
                    </>
                ) : (
                    <div className='bg-white w-full h-full rounded-2xl py-4 px-1.5 sm:px-4 pb-2'>
                        <NoRequest text={'درخواستی یافت نشد!'} wImg={'w-3/5'}/>
                    </div>
                )
            }
        </div>
    )
}
                       