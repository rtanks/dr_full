import DoctorItem from "../components/doctor/DoctorItem";
import HeaderRequestStatus from "../components/request/HeaderRequestStatus";
import { getKeyRequest, getTypeRequest } from "../services/func/getTypeRequest";
import '../dr.css';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import HeaderAuth from '../services/api/headerAndUrlService.js'
import { useEffect, useState } from "react";
import LoadingMini from '../components/LoadingMini'

export default function VisitDoctor() {
    const { baseUrl, headers } = HeaderAuth();
    const [doctors, setDoctors] = useState([]);
    const {data, isLoading, isPending} = useQuery({queryKey: ['doctors'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/doctors/list/`, {headers});
        console.log(response);
        return response.data;
    }})
    useEffect(() => {
        if(!isPending) {
            console.log(data);
            setDoctors(data);
        }
    }, [data])
    if(isLoading) return <LoadingMini/>
    return (
        <div className="w-full h-full flex flex-col gap-1">
            <HeaderRequestStatus typeRequest={'مشاوره جدید'} titleRequest={getTypeRequest()} 
            statusRequest={'در حال انجام'} keyRequest={getKeyRequest()} date={'1404/12/22'} time={'14:45'}/>
            <div className='bg-white w-full h-full rounded-2xl px-1 sm:px-4 py-5 overflow-y-scroll'>
                {
                    doctors.map(doctor => (
                        <DoctorItem key={doctor._id} doctor={doctor}/>
                    ))
                }
            </div>
        </div>
    )
}