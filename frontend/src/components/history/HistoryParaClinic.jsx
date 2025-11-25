import HistoryItem from "./HistoryItem";
import axios from "axios";
import HeaderAuth from "../../services/api/headerAndUrlService";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingMini from "../LoadingMini";
import Cookies from "js-cookie";
import {useDispatch} from 'react-redux'
import { getShowModal } from "../../slices/modalSlice";
import CheckAuth from "../../services/hook/CheckAuth";

export default function HistoryParaClinic () {
    const [histories, setHistories] = useState([]);
    const { id, headers, baseUrl } = HeaderAuth();
    const dispatch = useDispatch();
    const {checkAuthUser} = CheckAuth();
    
    const {data, isLoading, isPending} = useQuery({queryKey: ["historiesPara"], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/requests/user/${id}`, {headers});
        console.log(response)
        return response.data;
    }, enabled: checkAuthUser()});
    const clickHandler = (idHistory) => {
        Cookies.set('idHistory', idHistory);
        dispatch(getShowModal({item:'history'}));
        console.log('hello')
    }
    useEffect(() => {
        if(!isPending) {
            console.log(data);
            setHistories(data)
        }
    }, [data])
    if(isLoading) return <LoadingMini/>
    return (
        <div className="w-full h-max bg-white rounded-2xl flex flex-col gap-2 p-1">
            {
                histories.map(historyItem => (
                    <HistoryItem key={historyItem._id} onClick={() => clickHandler(historyItem._id)} 
                    date={historyItem.createdAt} service={historyItem.request.service}/>
                ))
            }
        </div>
    )
}