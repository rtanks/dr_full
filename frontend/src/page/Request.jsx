import { useEffect, useState } from "react";
import HeaderRequestStatus from "../components/request/HeaderRequestStatus";
import HeaderAuth from "../services/api/headerAndUrlService";
import { useQuery } from "@tanstack/react-query";
import { convertDateToLocalFormat } from "../services/func/transformDate";
import { getKeyRequestWithService, getServiceRequest} from "../services/func/getTypeRequest";
import axios from "axios";
import Loading from "../components/Loading";
import NoRequest from "../components/general/NoRequest";
import RequestParaClinic from "../components/request/request-category/RequestParaClinic";
import RequestDoctor from "../components/request/request-category/RequestDoctor";
import { useNavigate } from "react-router-dom";

export default function Request() {
    const { headers, baseUrl } = HeaderAuth();
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState({})
    const params = new URLSearchParams(location.search);
    const id = params.get('id')
    const {data, isLoading, isPending, isError} = useQuery({queryKey: ["history"], queryFn: async () => {
        return await axios.get(`${baseUrl}/requests/${id}/`,{headers}).then(
            res => {
                return res.data;
            }
        ).catch(err => {
            navigate('/');
            location.reload();
        })
    }})
    const categoryRequest = (dataTarget) => {
        switch(dataTarget.request.category) {
            case 'paraClinic':
            case 'test': 
            case 'medicine':
                return <RequestParaClinic data={dataTarget.request}/>;
            case 'doctorConsulting': 
            case 'hospital': 
                return <RequestDoctor data={dataTarget}/>
            default: return ''
        }
    }
    useEffect(() => {
        if(!isPending) {
            console.log(data);
            console.log("first", {
                request:{...data.request, date: convertDateToLocalFormat(data?.request.createdAt).dateValue,
                time: convertDateToLocalFormat(data?.request.createdAt).time},
                doctor: data.doctor
            })
            setHistoryData({
                request:{...data.request, date: convertDateToLocalFormat(data?.request.createdAt).dateValue,
                time: convertDateToLocalFormat(data?.request.createdAt).time},
                doctor: data.doctor
            });
        }
    }, [data])
    if(isLoading && id) return <Loading/>
    return (
        <div className="w-full h-full flex flex-col gap-1">
            {
                data ? (
                    <>
                        <HeaderRequestStatus typeRequest={getServiceRequest(historyData?.request?.request?.service)} titleRequest={'تکمیل نشده / نیاز به پرداخت'} 
                        statusRequest={historyData?.request?.statusPay == 'success'? "پرداخت شده":  (historyData?.request?.statusPay == 'pending'? "درحال انجام" : "پرداخت نشده")} 
                        keyRequest={getKeyRequestWithService(historyData?.request?.request?.service)} 
                        date={historyData?.date} time={historyData?.time} />
                        <div className='bg-white w-full h-full rounded-2xl py-5 px-3.5 sm:px-4 pb-2'>
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
                       