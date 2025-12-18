import HistoryItem from "./HistoryItem";
import axios from "axios";
import HeaderAuth from "../../services/api/headerAndUrlService";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingMini from "../LoadingMini";
import Cookies from "js-cookie";
import {useDispatch} from 'react-redux'
import { getShowModal } from "../../slices/modalSlice";
import CheckAuth from "../../services/hook/CheckAuth";
import { useNavigate } from "react-router-dom";
import NoRequest from "../general/NoRequest";

export default function HistoryParaClinic ({history}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clickHandler = (idHistory) => {
        navigate(`/request/${idHistory}`)
        queryClient.invalidateQueries({queryKey:['history']})
    }
    return (
        <div className="w-full h-max bg-white rounded-2xl flex flex-col gap-2 p-1">
            {
                history.length == 0 ? (
                    <NoRequest text={'سابقه خدمات پاراکلینیک یافت نشد!'} wImg={'w-4/5 mt-[40%]'}/>
                ) : (
                    <>
                        {
                            history.map(historyItem => (
                                <HistoryItem key={historyItem._id} id={historyItem._id} onClick={() => clickHandler(historyItem._id)} 
                                date={historyItem.createdAt} service={historyItem.request.service} payed={historyItem.statusPay}/>
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}